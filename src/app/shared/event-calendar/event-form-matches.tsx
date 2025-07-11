'use client';

import uniqueId from 'lodash/uniqueId';
import { PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler } from 'react-hook-form';
import { ActionIcon, Button, Input, Text, Textarea, Title } from 'rizzui';
import cn from '@/utils/class-names';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { Form } from '@/components/ui/form';
import toast from 'react-hot-toast';
import { DatePicker } from '@/components/ui/datepicker';
import { CalendarEvent } from '@/types';
import useEventCalendar from '@/hooks/use-event-calendar';
import {
  EventFormInput,
  eventFormSchema,
} from '@/utils/validators/create-event.schema';
import firebase from '@/config/firebase.config';
import { doc, onSnapshot, setDoc, addDoc, query, collection, getDocs, where, serverTimestamp } from "firebase/firestore";
import { currentSession } from '@/config/session';
import { useEffect, useState } from 'react';

interface CreateEventProps {
  startDate?: Date;
  endDate?: Date;
  event?: CalendarEvent;
  title?: string;
  virtual?: boolean;
  description?: string;
  location?: string;
  participants?: any[];
}

export default function EventForm({
  startDate,
  endDate,
  event,
  title,
  description,
  location,
  participants,
}: CreateEventProps) {
  const { closeModal } = useModal();
  const { createEvent, updateEvent } = useEventCalendar();
  const currentUser = currentSession() as any;

  const isUpdateEvent = event !== undefined;

  const [locationPlaceholder, setLocationPlaceholder] = useState('Add Google Meet or Zoom link');
  const [locationLabel, setLocationLabel] = useState('Meeting Location');

  const onSubmit: SubmitHandler<EventFormInput> = (data) => {
    const isNewEvent = data.id === '' || data.id === undefined;

    if (isNewEvent) {
      createEvent({
        id: uniqueId(),
        start: data.startDate ?? startDate,
        end: data.endDate ?? endDate,
        title: data.title,
        description: data.description,
        location: data.location,
        virtual: data.virtual === 'true',
        user: currentUser,
        userID: currentUser?.id,
        createdAt: serverTimestamp(),
        participants: participants,
      });
    } else {
      updateEvent({
        ...data,
        start: data.startDate,
        end: data.endDate,
        virtual: data.virtual,
      });
    }
    closeModal();
  };

  return (
    <div className="m-auto p-4 md:px-7 md:py-10">
      <div className="mb-6 flex items-center justify-between">
        <Title as="h3" className="text-lg">
          {isUpdateEvent ? 'Update Meeting' : 'Schedule Meeting'}
        </Title>
        <ActionIcon
          size="sm"
          variant="text"
          onClick={() => closeModal()}
          className="p-0 text-gray-500 hover:!text-gray-900"
        >
          <PiXBold className="h-[18px] w-[18px]" />
        </ActionIcon>
      </div>

      <Form<EventFormInput>
        validationSchema={eventFormSchema}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: {
            title: event?.title ?? '',
            description: event?.description ?? '',
            location: event?.location ?? '',
            startDate: startDate ?? event?.start,
            virtual: event?.virtual ? 'true' : 'false',
            endDate: endDate ?? event?.end,
          },
        }}
        className="grid grid-cols-1 gap-5 @container md:grid-cols-2 [&_label]:font-medium"
      >
        {({ register, control, watch, setValue, formState: { errors, isValid } }) => {
          const virtual = watch('virtual');

          useEffect(() => {
            if (virtual === 'true') {
              // setValue('location', 'Google Meet');
              setLocationPlaceholder('Please add meeting link (Google Meet or Zoom)');
              setLocationLabel('Meeting Link');
            } else {
              setValue('location', '');
              setLocationPlaceholder('Enter a location for this meeting if it\'s not virtual');
              setLocationLabel('Meeting Location');
            }
          }, [virtual, setValue]);

          return (
            <>
              <input type="hidden" {...register('id')} value={event?.id} />
              <Input
                label="Meeting Title"
                placeholder="Enter a name of for this meeting"
                {...register('title')}
                className="col-span-full"
                error={errors.title?.message}
              />

              <Textarea
                label="Meeting Description"
                placeholder="Enter a description for this meeting"
                {...register('description')}
                error={errors.description?.message}
                textareaClassName="h-20"
                className="col-span-full"
              />
              <div className="col-span-full">
                <Text as="span" className="font-medium">
                  Is this a virtual meeting?
                </Text>
                <div className="flex items-center space-x-4 mt-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="true"
                      {...register('virtual')}
                      className="form-radio"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="false"
                      {...register('virtual')}
                      className="form-radio"
                    />
                    <span>No</span>
                  </label>
                </div>
                {errors.virtual && (
                  <Text as="p" className="text-red-500 mt-1">
                    {errors.virtual.message}
                  </Text>
                )}
              </div>
              <Input
                label={locationLabel}
                placeholder={virtual === 'true' ? locationPlaceholder : 'Enter a location for this meeting'}
                {...register('location')}
                error={errors.location?.message}
                className="col-span-full"
              />
              <Controller
                name="startDate"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <DatePicker
                    popperPlacement="top-start"
                    selected={value}
                    onChange={onChange}
                    selectsStart
                    startDate={value}
                    endDate={endDate}
                    minDate={new Date()}
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="date-picker-event-calendar"
                    placeholderText="Event Start Date"
                  />
                )}
              />
              <Controller
                name="endDate"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <DatePicker
                    popperPlacement="top-start"
                    selected={value}
                    onChange={onChange}
                    selectsEnd
                    minDate={startDate}
                    startDate={startDate}
                    endDate={value}
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="date-picker-event-calendar"
                    placeholderText="Event End Date"
                  />
                )}
              />
              <div className={cn('col-span-full grid grid-cols-2 gap-4 pt-5')}>
                <Button
                  variant="outline"
                  className="w-full @xl:w-auto dark:hover:border-gray-400"
                  onClick={() => closeModal()}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="hover:gray-700 w-full @xl:w-auto"
                  disabled={!isValid}
                >
                  Schedule
                </Button>
              </div>
            </>
          );
        }}
      </Form>
    </div>
  );
}
