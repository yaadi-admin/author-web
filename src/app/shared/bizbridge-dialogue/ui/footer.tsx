import { PiCheck } from 'react-icons/pi';
import { Button, Popover, Text, Title, Tooltip } from 'rizzui';
import { useSearchParams } from 'next/navigation';
interface FooterProps {
  formId: string,
  onBack?: () => void,
  rightLabel?: string,
  confirm?: boolean
}

export default function Footer(props: FooterProps) {
  const { formId, onBack, rightLabel = "Done", confirm = true } = props;
  const searchParams = useSearchParams();
  const tId = searchParams.get('threadId');
  return (
    <>
      <footer
        className='fixed bottom-0 left-0 flex items-center justify-between gap-3 px-4 pb-3 lg:px-8 4xl:px-10 z-50'
        style={{ width: '100%' }}
      >
        {onBack &&
          <Button
            rounded="pill"
            variant="flat"
            color='primary'
            className="gap-1"
            onClick={onBack}
          >
            Back
          </Button>
        }

        {confirm ?
          <Tooltip content="Ensure you've answered all the questions before clicking 'Done'.">
            <Popover>
              <Popover.Trigger>
                <Button
                  rounded="pill"
                  variant='solid'
                  color="primary"
                  className="ml-auto mr-8 "
                >
                  <span>{rightLabel}</span> &nbsp;
                  <PiCheck className='font-bold' />
                </Button>
              </Popover.Trigger>
              <Popover.Content>
                {({ setOpen }) => (
                  <div className="w-56">
                    <Title as="h6">Confirmation</Title>
                    <Text>Are you sure you answered all the questions in this form/dialogue?</Text>
                    <div className="flex justify-end gap-3 mb-1">
                      <Button size="sm" variant="outline" onClick={() => setOpen(false)}>
                        No
                      </Button>
                      <Button size="sm"
                        form={formId}
                        onClick={() => setOpen(false)}
                        type={'submit'}
                      >
                        Yes
                      </Button>
                    </div>
                  </div>
                )}
              </Popover.Content>
            </Popover>
          </Tooltip>
          : null
        }
      </footer>
    </>
  );
}