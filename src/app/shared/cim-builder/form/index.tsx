'use client';

import React from 'react'
import { Controller, useForm, useFormContext } from 'react-hook-form';
import { Button, Input, FieldError, Checkbox } from 'rizzui';
import { cimCollection } from 'src/config/ref/cimBuilderCollection'
import Image from 'next/image';
// import Upload from './upload';
import UploadFile from './upload-file';
import ImageUpload from '@/app/shared/image-upload';
import { IoCloseCircleOutline } from 'react-icons/io5';
import axios from 'axios';
import { currentSession } from '@/config/session';
import SelectLoader from '@/components/loader/select-loader';
import dynamic from 'next/dynamic';
import { cim } from '@/config/seller/cim';
import { aigentUrls, BASE_URL } from '@/config/bots';
import WisdomLoader from '@/components/ui/loader-wisdom';
import { collection, addDoc } from 'firebase/firestore';
import Table from './tables';
import firebase from '@/config/firebase.config';
import FormGroup from './group';

const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
  ssr: false,
  loading: () => <SelectLoader />,
});


function CIMForm({ id, listingId, onNext }: { id: string, listingId: string, onNext?: any }) {
  const { data } = cimCollection();
  const { updateMyCIM, findNextStep } = cim(listingId)

  const specificData = data.find((d: any) => d.id === id);
  const currentUser = currentSession();
  const fields = specificData?.section1?.fields || [];
  const [loading, setLoading] = React.useState(false);
  const methods = useForm();


  async function processFileFields(submittedData: any) {
    const fileFields = fields.filter((f: any) => f.type === 'file');

    const imageFields = fields.filter((f: any) => f.type === 'image');


    for (const i of imageFields) {
      const url = `${BASE_URL}/api/vision/process`;

      if (submittedData?.[i.key]) {
        if (i.prompt) {

          await axios.post(
            url,
            {
              prompt: i.prompt,
              userID: currentUser?.id,
              imageURL: submittedData?.[i.key][0],
              user: currentUser,
              type: "vision",
              key: i.key,
            }
          );
        }
      }
    }

    for (const f of fileFields) {

      const url = f.aigent ? aigentUrls[f.aigent].url : '';
      const promptKey = f.aigent ? aigentUrls[f.aigent].promptKey : '';

      if (submittedData?.[f.key]) {


        const documentURL = submittedData?.[f.key];


        if (documentURL) {
          try {
            const docRef = await addDoc(collection(firebase.firestore, "files"), {
              category: f.category, // TODO handle this based on card id
              createdAt: new Date().toISOString(),
              documentURL: documentURL,
              title: f.key, // Store the field name as the title
              userID: currentUser.id,
              user: currentUser,
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        } else {
          console.log(`No document URL found for field: ${f.key}`);
        }

        await axios.post(
          url,
          {
            [promptKey]: f.prompt || 'Extract this data',
            userID: currentUser?.id,
            fileURL: submittedData?.[f.key],
            user: currentUser,
            key: f.key,
            type: 'financial', // TODO: handle different type
          }
        );
      }
    }
  }

  const onSubmit = async (submittedData: any) => {
    function replaceUndefinedWithNull(obj: any) {
      // Iterate over the keys in the object
      for (const key in obj) {
        if (obj[key] === undefined) {
          obj[key] = null;
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          // Recursively apply the function if the property is an object
          replaceUndefinedWithNull(obj[key]);
        }
      }
      return obj;
    }


    // function generateMarkdownTable(orgChart: [{ name: string, position: string }]) {
    //   const filteredOrgChart = orgChart.filter(({ name, position }: { name: string, position: string }) => name && position);
    //   if (!Array.isArray(filteredOrgChart) || filteredOrgChart.length === 0) {
    //     return 'No data available';
    //   }

    //   let markdown = '| Name | Position |\n';
    //   markdown += '|------|----------|\n';

    //   filteredOrgChart.forEach(({ name, position }) => {
    //     markdown += `| ${name} | ${position} |\n`;
    //   });

    //   return markdown;
    // }

    // const orgChart = generateMarkdownTable(data?.organizationalChart || []);


    try {

      setLoading(true);
      console.log('helo')
      await processFileFields(submittedData);
      console.log('here')
      await axios.post(
        `${BASE_URL}/api/bizbridge/serv/authenticate`,
        {
          type: id,
          key: 'intake',
          data: JSON.stringify(submittedData),
          function: "sendToFireInstance",
          user: currentUser,
          subKey: listingId,
          userID: currentUser?.id,
        },
        {
          headers: {
            Authorization: 'skl-bhdbjcbcbcbdjb'
          },
          maxContentLength: Infinity, // This sets the max content length to unlimited
          maxBodyLength: Infinity // This sets the max body length to unlimited
        }
      );

      await updateMyCIM({
        listingId,
        cardId: id,
        params: {
          architectPrompt: specificData?.section2?.architectPrompt || '',
          form: replaceUndefinedWithNull(submittedData),
        }
      })

    } catch (error) {
      console.log(error);
      setLoading(false);

    } finally {
      setLoading(false);
      const nextStep = findNextStep('section1', id);
      onNext(nextStep);
    }

  };

  if (loading) {
    return <WisdomLoader isLoading={loading} messages={[
      "Preparing your files...",
      "Extracting your files...",
      "Encrypting your files...",
      "Finalizing the details..."
    ]} />
  }

  return (
    <div>


      <div className="@container">
        <div className="flex">
          <div className="w-full">


            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className={
                'relative z-[19] [&_label.block>span]:font-medium'

              }
            >

              <FormGroup
                title={specificData?.section1?.title}
              // description="Information about you and the business you are looking to sell"
              >

                {fields.map((field: any, index: any) => renderField(field, index, methods))}

              </FormGroup>

              <Button type="submit" className='mt-10 ml-auto'>
                Next
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}


const renderField = (field: {
  key: string; type: string; label: string; placeholder: string; options: [],
}, index: any, methods: any) => {

  const {
    register,
    control,
    formState: {
      errors,
    },
    watch,
  } = methods;

  const val = watch()




  switch (field.type) {
    case 'text':
      return <Input
        label={field.label}
        className='col-span-full'
        placeholder={field.placeholder}
        {...register(`${field.key}`)} />;
    case 'select':
      return <Controller
        name={field.key}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            dropdownClassName="z-[9999]"
            className="col-span-full"
            options={(field?.options || []).map((val: string) => ({ label: val, value: val }))}
            value={value}
            onChange={onChange}
            label={field.label}
            error={errors?.[field.key]?.message as string}
            getOptionValue={(option) => option.value}
          />
        )}
      />
    case 'file':
      return <Controller
        key={field.key}
        name={field.key}
        control={control}
        render={({ field: { onChange, value } }) => {
          const label = <div className='flex flex-col'>{field.label}
          </div>;
          const fileName = (value ?? '').split('/').pop().split('?')[0];
          return (
            <div className=''>
              <UploadFile
                label={label}
                modalView={
                  <ImageUpload
                    multiple={false}
                    accept='all'
                    onImageUploaded={(url, cb) => {
                      onChange(url);
                      cb();
                    }}
                    label={`Upload ${field.label}`}
                    isCompanyLogo={false}
                  />
                }
              />
              {/* @ts-ignore */}
              {errors?.[field.key]?.message && (
                // @ts-ignore
                <FieldError size="md" error={(errors?.[field.key]?.message) || ''} />
              )}
              {value &&
                <div className='mt-2 border p-2 '>
                  <div className='flex'>
                    <p className='pt-2 w-1/2 truncate'>{fileName}</p>
                    <IoCloseCircleOutline
                      className='cursor-pointer w-1/2 ml-auto h-8 w-8 mb-2'
                      onClick={() => onChange('')}
                    />
                  </div>
                </div>
              }
            </div>
          )
        }}
      />;

    case 'checkbox':
      return <Controller
        name={field.key}
        control={control}
        // @ts-ignore
        render={({ field: { onChange, value } }) => {
          const checkbox = value || [];
          const handleChange = (item: string) => {
            const subCategoryArr = [...checkbox];
            const index = subCategoryArr.indexOf(item);
            if (index === -1) {
              subCategoryArr.push(item);
            } else {
              subCategoryArr.splice(index, 1);
            }
            onChange(subCategoryArr);
          };
          if (field.options.length === 0) return null;
          return (
            <div className='col-span-full'>
              <span className='rizzui-input-label block text-sm font-medium col-span-full'>
                {field.label}
              </span>
              {errors?.[field.key]?.message && (
                // @ts-ignore
                <FieldError size="md" error={(errors?.[field.key]?.message) || ''} />
              )}
              {field.options.map((item) => (<Controller
                key={item}
                name={item} // Use item name as the control name
                control={control}
                render={() => (
                  <Checkbox
                    className='m-2'
                    name={item}
                    variant="outline"
                    label={item}
                    value={checkbox.includes(item)}
                    checked={checkbox.includes(item)}
                    onChange={() => handleChange(item)}
                  />
                )}
              />))}
            </div>
          )
        }}
      />

    case 'image':
      return (
        <Controller
          key={field.key}
          name={field.key}
          control={control}
          render={({ field: { onChange, value } }) => {
            const label = (
              <div className='flex flex-col '>
                {field.label}
              </div>
            );

            const fileNames = (value as string[] ?? []).map((val) =>
              val?.split('/')?.pop()?.split('?')[0]
            );

            return (
              <div>
                <UploadFile
                  label={label}
                  modalView={
                    <ImageUpload
                      multiple={true}
                      accept='all'
                      onMultipleImageUploaded={(urls, cb) => {
                        onChange(urls);
                        cb(); // Ensure this closes the modal
                      }}
                      label={`File ${index + 1}`}
                      isCompanyLogo={false}
                    />
                  }
                />
                {/* @ts-ignore */}
                {errors?.[field.key]?.message && (
                  // @ts-ignore
                  <FieldError
                    size="md"
                    error={(errors?.[field.key]?.message) || ''}
                  />
                )}
                {fileNames.length > 0 && (
                  <div className='mt-2 border p-2'>
                    {fileNames.map((name, index) => (
                      <div key={index} className='flex'>
                        <p className='pt-2 w-1/2 truncate'>{name}</p>
                        <IoCloseCircleOutline
                          className='cursor-pointer w-1/2 ml-auto h-8 w-8 mb-2'
                          onClick={() => {
                            const newValue = [...(value as string[])];
                            newValue.splice(index, 1);
                            onChange(newValue);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          }}
        />
      );

    case 'number':
      return <Input
        label={field.label}
        className='col-span-full'
        placeholder={field.placeholder}
        {...register(`${field.key}`)} />;

    case 'tables':
      return (
        <Table field={field} control={control} register={register}></Table>
      );

    default:
      return null;
  }
};



export default CIMForm