'use client';

import { useState, useEffect } from 'react';
import HorizontalFormBlockWrapper from '@/app/shared/account-settings/horiozontal-block';
import {
  Button,
  Text,
  Switch,
  CheckboxGroup,
  Checkbox,
  RadioGroup,
  Radio,
} from 'rizzui';
import firebase from '@/config/firebase.config';
import { currentSession } from '@/config/session';
import {
  collection,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import toast from 'react-hot-toast';

const generalOptions = [
  {
    title: 'I’m mentioned in a message',
  },
  {
    title: 'Someone replies to any message',
  },
  {
    title: 'I’m assigned a task',
  },
  {
    title: 'A task is overdue',
  },
  {
    title: 'A task status is updated',
  },
];

const summaryOptions = [
  {
    title: 'Daily summary',
  },
  {
    title: 'Weekly summary',
  },
  {
    title: 'Monthly summary',
  },
  {
    title: 'Quaterly summary',
  },
];

export default function NotificationSettingsView() {
  const [values, setValues] = useState<string[]>([]);
  const [value, setValue] = useState('');
  const [notificationSettings, setNotificationSettings] = useState<any>({});
  const currentUser = currentSession() as any;

  useEffect(() => {
    async function fetchNotificationSettings() {
      const userDocRef = doc(collection(firebase.firestore, 'user_notification_settings'), currentUser.id);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        setNotificationSettings(userDoc.data());
      }
    }
    fetchNotificationSettings();
  }, [currentUser.id]);

  async function updateNotificationSettings(field: string, value: any) {
    const userDocRef = doc(collection(firebase.firestore, 'user_notification_settings'), currentUser.id);
    try {
      await setDoc(userDocRef, {
        [field]: value,
      }, { merge: true });
      toast.success('Notification settings updated successfully');
    } catch (error) {
      toast.error('Failed to update notification settings');
      console.error('Error updating notification settings:', error);
    }
  }

  return (
    <div className="@container">
      <HorizontalFormBlockWrapper
        childrenWrapperClassName="gap-0 @lg:gap-0"
        title="Notifications"
        titleClassName="text-xl font-semibold"
        description="Select when and how you will be notified."
      />
      <HorizontalFormBlockWrapper
        title="General notifications"
        description="Select when you’ll be notified when the following changes occur."
        descriptionClassName="max-w-[344px]"
      >
        <div className="col-span-2">
          {generalOptions.map((opt, index) => (
            <div
              key={`generalopt-${index}`}
              className="flex items-center justify-between border-b border-muted py-6 last:border-none last:pb-0"
            >
              <Text className="text-sm font-medium text-gray-900">
                {opt.title}
              </Text>
              <ButtonGroup
                selected={notificationSettings[`general.${opt.title.replace(/\s+/g, '_').toLowerCase()}`]}
                onChange={(option) => updateNotificationSettings(`general.${opt.title.replace(/\s+/g, '_').toLowerCase()}`, option)}
              />
            </div>
          ))}
        </div>
      </HorizontalFormBlockWrapper>
      <HorizontalFormBlockWrapper
        title="Summary notifications"
        description="Select when you’ll be notified when the following summaries or report are ready."
        descriptionClassName="max-w-[344px]"
      >
        <div className="col-span-2">
          {summaryOptions.map((opt, index) => (
            <div
              key={`summaryopt-${index}`}
              className="flex items-center justify-between border-b border-muted py-6 last:border-none last:pb-0"
            >
              <Text className="text-sm font-medium text-gray-900">
                {opt.title}
              </Text>
              <ButtonGroup
                selected={notificationSettings[`summary.${opt.title.replace(/\s+/g, '_').toLowerCase()}`]}
                onChange={(option) => updateNotificationSettings(`summary.${opt.title.replace(/\s+/g, '_').toLowerCase()}`, option)}
              />
            </div>
          ))}
        </div>
      </HorizontalFormBlockWrapper>
      <HorizontalFormBlockWrapper
        title="Comments"
        description="These are notifications for comments"
        descriptionClassName="max-w-[344px]"
      >
        <div className="col-span-2">
          <Switch
            label="Do not notify me"
            variant="flat"
            labelClassName="font-medium text-sm text-gray-900"
            checked={notificationSettings['comments.do_not_notify']}
            onChange={(checked) => updateNotificationSettings('comments.do_not_notify', checked)}
          />
          <Switch
            label="Mentions only"
            variant="flat"
            labelClassName="font-medium text-sm text-gray-900"
            checked={notificationSettings['comments.mentions_only']}
            onChange={(checked) => updateNotificationSettings('comments.mentions_only', checked)}
          />
          <Switch
            label="All comments"
            variant="flat"
            labelClassName="font-medium text-sm text-gray-900"
            checked={notificationSettings['comments.all_comments']}
            onChange={(checked) => updateNotificationSettings('comments.all_comments', checked)}
          />
        </div>
      </HorizontalFormBlockWrapper>
      <HorizontalFormBlockWrapper
        title="Notifications from us"
        description="These are notifications for when someone tags you in a message"
        descriptionClassName="max-w-[344px]"
      >
        <div className="col-span-2">
          <CheckboxGroup
            values={values}
            setValues={(newValues) => {
              setValues(newValues);
              updateNotificationSettings('notifications_from_us', newValues);
            }}
            className="flex flex-col"
          >
            <Checkbox
              name="app_notification"
              label="News and updates"
              value="news_updates"
              className="mb-5"
              labelClassName="pl-2 text-sm font-medium !text-gray-900"
              helperClassName="text-gray-500 text-sm mt-3 ms-8"
              helperText="News about product and feature updates."
              checked={values.includes('news_updates')}
            />
            <Checkbox
              name="app_notification"
              label="Tips and tutorials"
              value="tips_tutorials"
              className="mb-5"
              labelClassName="pl-2 text-sm font-medium text-gray-900"
              helperClassName="text-gray-500 text-sm mt-3 ms-8"
              helperText="Tips on getting more out of Untitled."
              checked={values.includes('tips_tutorials')}
            />
            <Checkbox
              name="app_notification"
              label="User research"
              value="user_research"
              labelClassName="pl-2 text-sm font-medium text-gray-900"
              helperClassName="text-gray-500 text-sm mt-3 ms-8"
              helperText="Get involved in our beta testing program or participate in paid product user research."
              checked={values.includes('user_research')}
            />
          </CheckboxGroup>
        </div>
      </HorizontalFormBlockWrapper>
      <HorizontalFormBlockWrapper
        title="Reminders"
        description="These are notifications to remind you of updates you might have missed."
        descriptionClassName="max-w-[344px]"
      >
        <div className="col-span-2">
          <RadioGroup
            value={value}
            setValue={(newValue) => {
              setValue(newValue);
              updateNotificationSettings('reminders', newValue);
            }}
            className="justify-center space-x-4 space-y-4"
          >
            <div className="flex w-full flex-col divide-slate-300 md:w-[500px]">
              <Radio
                name="reminders"
                label="Do not notify me"
                value="do_not_notify"
                className="mb-5"
                labelClassName="pl-2 text-sm font-medium text-gray-900"
                checked={value === 'do_not_notify'}
              />
              <Radio
                name="reminders"
                label="Important reminders only"
                value="important_only"
                className="mb-5"
                labelClassName="pl-2 text-sm font-medium text-gray-900"
                helperClassName="text-gray-500 text-sm mt-3 ms-8"
                helperText="Only notify me if the reminder is tagged as important."
                checked={value === 'important_only'}
              />
              <Radio
                name="reminders"
                value="all_reminder"
                label="All reminders"
                labelClassName="pl-2 text-sm font-medium text-gray-900"
                helperClassName="text-gray-500 text-sm mt-3 ms-8"
                helperText="Notify me for all reminders."
                checked={value === 'all_reminder'}
              />
            </div>
          </RadioGroup>
        </div>
      </HorizontalFormBlockWrapper>
      <HorizontalFormBlockWrapper
        title="More activity about you"
        description="These are notifications for additional activity and more."
        descriptionClassName="max-w-[344px]"
        className="border-0 pb-0"
      >
        <div className="col-span-2">
          <RadioGroup
            value={value}
            setValue={(newValue) => {
              setValue(newValue);
              updateNotificationSettings('more_activity', newValue);
            }}
            className="justify-center space-x-4 space-y-4"
          >
            <div className="flex w-full flex-col divide-slate-300 md:w-[500px]">
              <Radio
                name="activity"
                label="Do not notify me"
                value="do_not_notify_activity"
                className="mb-5"
                labelClassName="pl-2 text-sm font-medium text-gray-900"
                checked={value === 'do_not_notify_activity'}
              />
              <Radio
                name="activity"
                value="all_reminder_activity"
                label="All reminders"
                labelClassName="pl-2 text-sm font-medium text-gray-900"
                helperClassName="text-gray-500 text-sm mt-3 ms-8"
                helperText="Notify me for all reminders."
                checked={value === 'all_reminder_activity'}
              />
            </div>
          </RadioGroup>
        </div>
      </HorizontalFormBlockWrapper>
    </div>
  );
}

const options = ['None', 'In-app', 'Email'];

function ButtonGroup({ selected, onChange }: { selected?: string, onChange: (option: string) => void }) {
  const [selectedOption, setSelectedOption] = useState<string | undefined>(selected);

  useEffect(() => {
    setSelectedOption(selected);
  }, [selected]);

  function handleOnClick(option: string) {
    setSelectedOption(option);
    onChange && onChange(option);
  }

  return (
    <div className="inline-flex gap-1">
      {options.map((option) => (
        <Button
          key={option}
          variant={selectedOption === option ? 'solid' : 'outline'}
          onClick={() => handleOnClick(option)}
        >
          {option}
        </Button>
      ))}
    </div>
  );
}
