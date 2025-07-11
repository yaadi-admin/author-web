'use client'
import { useForm, Controller } from 'react-hook-form';
import { Input, Button, Select, Textarea } from 'rizzui';
import { DatePicker } from '@/components/ui/datepicker';
import React, { useState, useCallback, useEffect } from 'react';
import { SchedulerData } from "@bitnoi.se/react-scheduler";
import dayjs from "dayjs";
import "@bitnoi.se/react-scheduler/dist/style.css";
import isBetween from "dayjs/plugin/isBetween";
import { useModal } from '@/app/shared/modal-views/use-modal';
import { Gantt, Task, ViewMode } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
import FormGroup from '@/app/shared/form-group';
import { Timestamp } from 'firebase/firestore';
import { PiInfoDuotone, PiPencil } from 'react-icons/pi';




dayjs.extend(isBetween);

import dynamic from "next/dynamic";
import { successionPlan } from '@/config/client/successionPlan';
const Scheduler = dynamic(() => import("@bitnoi.se/react-scheduler").then((mod) => mod.Scheduler), {
  ssr: false
});



export default function MainComponent() {
  const { openModal, closeModal } = useModal();
  const { userIntakeData: successionData, editTask, startTask, addTask } = successionPlan();
  const [tasks, setTasks] = useState<Array<{
    id: string;
    name: string;
    startDate: Date | string;
    endDate: Date | string;
    owner: string;
    ownerEmail: string;
    status: string;
    ownerPicture: string;
    progress: number;
  }>>([]);

  // Transform `actionItems` to `Task[]` format
  useEffect(() => {
    if (successionData && successionData.actionItems) {
      const formattedTasks = successionData.actionItems.map((task: any, index: number) => ({
        startDate: task.startDate || "-",
        endDate: task.endDate || "-",
        name: task.title,
        id: index.toString(),
        type: 'task',
        progress: 100,
        styles: { progressColor: "rgb(35,108,149)", progressSelectedColor: "rgb(254,165,177)" },
        owner: task.owner || "-",
        ownerPicture: "https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/M%20Scott.jpeg?alt=media&token=1ca117db-938b-48f4-bbde-288b15ca8a45", // Customize as needed
        status: task.status,
        description: task.description,
        estimated: task.estimatedTime
      }));
      setTasks(formattedTasks);
    }
  }, [successionData]);

  // Filter tasks for Gantt chart (exclude "pending" tasks with missing dates)
  const nonPendingTasks = tasks.filter(
    task => task.status?.toLowerCase() !== 'pending' && task.startDate !== "-" && task.endDate !== "-"
  );


  // Extract names from the successionData
  const advisors = successionData?.advisors || [];
  const otherOwners = (successionData?.otherOwners || []).map((o: any) => ({ name: o.ownerName, email: o.email, position: 'Other owner' }));
  const leadershipTeam = successionData?.leadershipTeam || [];

  // Flatten the arrays and map to options
  const responsiblePersonOptions = [
    ...otherOwners.flat(),
    ...advisors.flat(),
    ...leadershipTeam.flat()
  ].map((person, index) => ({ id: index + 1, value: person.name, position: person.position, email: person.email, label: person.name }));

  const { register, handleSubmit, control, setValue, formState: { errors }, reset } = useForm({
    defaultValues: {
      taskName: '',
      startDate: new Date(),
      endDate: new Date(),
      owner: '',
      status: '',
      description: '',
      suggested: 0, // Default suggested time for estimatedTime
    }
  });

  const openAddTaskModal = () => {
    reset({
      taskName: '',
      description: '',
      suggested: 30, // Default suggested time for estimatedTime
    });

    const onSubmit = (data: any) => {
      const startDate = new Date();
      const endDate = data.suggested ? new Date(startDate.getTime() + data.suggested * 24 * 60 * 60 * 1000) : null;

      // Convert dates to seconds and nanoseconds format
      const convertToSecondsAndNanoseconds = (date: any) => {
        return date
          ? {
            seconds: Math.floor(date.getTime() / 1000),
            nanoseconds: 0,
          }
          : null;
      };

      const startDateFormatted = convertToSecondsAndNanoseconds(startDate);
      const endDateFormatted = endDate ? convertToSecondsAndNanoseconds(endDate) : null;

      const newTask = {
        title: data.taskName,
        description: data.description,
        startDate: startDateFormatted,
        endDate: endDateFormatted,
        estimatedTime: data.suggested, // Use suggested time as estimatedTime
        priority: 'medium', // Default priority
        status: 'pending', // Default status
      };

      addTask(newTask); // Call function to add the new task
      closeModal();
    };

    openModal({
      customSize: '700px',
      view: (
        <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
          <div className="mb-7 flex items-center justify-between">
            <h4 className="font-semibold">Add New Task</h4>
            <Button variant="text" onClick={() => closeModal()}>Close</Button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input
                label="Task Name"
                placeholder="Enter task name"
                {...register('taskName', { required: 'Task Name is required' })}
                error={errors.taskName?.message}
              />
            </div>
            <div>
              <Textarea
                label="Description"
                placeholder="Enter task description"
                {...register('description')}
                error={errors.description?.message}
              />
            </div>
            <div>
              <Input
                label="Suggested Time (Days)"
                placeholder="Enter suggested time in days"
                {...register('suggested', { required: 'Suggested time is required', valueAsNumber: true })}
                error={errors.suggested?.message}
              />
            </div>
            <div className="flex items-center justify-end gap-4">
              <Button variant="outline" onClick={() => closeModal()}>
                Cancel
              </Button>
              <Button type="submit">
                Add Task
              </Button>
            </div>
          </form>
        </div>
      ),
    });
  };

  const openStartTaskModal = (task: any) => {
    const { id, name, startDate, endDate, owner, status, estimated } = task;

    // Convert Firebase Timestamp-like object to JavaScript Date object
    const convertToDate = (timestamp: any) => {
      if (timestamp && typeof timestamp === 'object' && 'seconds' in timestamp) {
        return new Date(timestamp.seconds * 1000);
      }
      return null;
    };

    // Determine initial values for start and end dates
    const startDateFormatted = startDate ? convertToDate(startDate) : null;
    const endDateFormatted = endDate ? convertToDate(endDate) : null;

    // Set form values programmatically
    setValue('taskName', name || '');
    // @ts-ignore
    setValue('startDate', startDateFormatted || null);
    // @ts-ignore
    setValue('endDate', endDateFormatted || null);
    setValue('owner', owner || '');
    setValue('suggested', estimated || '');



    const onSubmit = (data: any) => {
      const emailOwner = responsiblePersonOptions?.find((o) => o?.value === data?.owner)

      const updatedFields = {
        title: data.taskName,
        email: emailOwner?.email || '',
        owner: data.owner,
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
        status: 'inProgress', // Automatically set status to "in progress" when task is started
      };

      // Ensure the dates are properly converted to { seconds, nanoseconds } format
      const convertToSecondsAndNanoseconds = (date: any) => {
        return date
          ? {
            seconds: Math.floor(date.getTime() / 1000),
            nanoseconds: (date.getTime() % 1000) * 1e6,
          }
          : null;
      };

      if (updatedFields.startDate) {
        // @ts-ignore
        updatedFields.startDate = convertToSecondsAndNanoseconds(updatedFields.startDate);
      }

      if (updatedFields.endDate) {
        // @ts-ignore
        updatedFields.endDate = convertToSecondsAndNanoseconds(updatedFields.endDate);
      }

      const numericTaskId = Number(id);

      if (!isNaN(numericTaskId)) {
        startTask(task, updatedFields);
      } else {
        console.error('Invalid taskId: Not a number');
      }

      closeModal();
    };

    openModal({
      customSize: '700px',
      view: (
        <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7 h-[700px]">
          <div className="mb-7 flex items-center justify-between">
            <h4 className="font-semibold">Start Task</h4>
            <Button variant="text" onClick={() => closeModal()}>Close</Button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input
                label="Task Name"
                placeholder="Enter task name"
                {...register('taskName', { required: 'Task Name is required' })}
                error={errors.taskName?.message}
              />
            </div>
            <div>
              <label className="block mb-2" htmlFor="startDatePicker">Start Date</label>
              <Controller
                name="startDate"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <DatePicker
                    selected={value}
                    className="z-[9999]"
                    onChange={onChange}
                    dateFormat="MMMM d, yyyy"
                    placeholderText="Select start date"
                    id="startDatePicker"
                    // @ts-ignore
                    error={errors.startDate?.message}
                  />
                )}
              />
            </div>
            <div>
              <label className="block mb-2" htmlFor="endDatePicker">End Date</label>
              <Controller
                name="endDate"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <DatePicker
                    selected={value}
                    onChange={onChange}
                    dateFormat="MMMM d, yyyy"
                    placeholderText="Select end date"
                    id="endDatePicker"
                    // @ts-ignore
                    error={errors.endDate?.message}
                  />
                )}
              />
            </div>
            <div>
              <Controller
                name="owner"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Select
                    dropdownClassName="z-[9999]"
                    label="Responsible Person"
                    value={value ? { value, label: value } : null}
                    // @ts-ignore
                    onChange={(selectedOption) => onChange(selectedOption.value)}
                    options={responsiblePersonOptions}
                    getOptionDisplayValue={(option) => `${option.label} - ${option.position}`}

                    error={errors.owner?.message}
                  />
                )}
              />
            </div>
            <div>
              <Input
                label="Suggested Time (Days)"
                placeholder="Enter suggested time in days"
                value={estimated} // Displaying the value without editing
                disabled // Making it non-editable
              />
            </div>
            <div className="flex items-center justify-end gap-4">
              <Button variant="outline" onClick={() => closeModal()}>
                Cancel
              </Button>
              <Button type="submit">
                Start Task
              </Button>
            </div>
          </form>
        </div>
      ),
    });
  };


  // const addNewTask = (data: { taskName: any; startDate: any; endDate: any; owner: any; status: any; }) => {
  //   const newTask = {
  //     id: `new-${tasks.length + 1}`,
  //     name: data.taskName,
  //     startDate: data.startDate,
  //     endDate: data.endDate,
  //     owner: data.owner,
  //     status: data.status,
  //     ownerPicture: '',
  //     progress: 0,
  //   };
  //   setTasks([...tasks, newTask]);
  // };

  const openDescriptionModal = (task: { description: any; }) => {
    openModal({
      customSize: '600px',
      view: (
        <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
          <div className="mb-7 flex items-center justify-between">
            <h4 className="font-semibold">Task Description</h4>
            <Button variant="text" onClick={() => closeModal()}>Close</Button>
          </div>
          <div className="p-4">
            <p>{task.description || 'No description available.'}</p>
          </div>
        </div>
      ),
    });
  };

  const openEditTaskModal = (task: any) => {
    const { id, name, startDate, endDate, owner, status, description, estimated } = task;

    // Convert Firebase Timestamp-like object (seconds & nanoseconds) to JavaScript Date object
    const convertToDate = (timestamp: any) => {
      if (timestamp && typeof timestamp === 'object' && 'seconds' in timestamp) {
        return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6);
      }
      return null;
    };

    // Convert startDate and endDate if necessary
    const startDateFormatted = startDate ? convertToDate(startDate) : null;
    const endDateFormatted = endDate ? convertToDate(endDate) : null;

    const capitalizeStatus = (status: string) => {
      if (!status) return '-';
      switch (status) {
        case 'pending':
          return 'Pending';
        case 'inProgress':
          return 'In Progress';
        case 'completed':
          return 'Completed';
        default:
          return '-';
      }
    };

    // Set form values programmatically
    setValue('taskName', name || '');
    // @ts-ignore
    setValue('startDate', startDateFormatted instanceof Date && !isNaN(startDateFormatted) ? startDateFormatted : null);
    // @ts-ignore
    setValue('endDate', endDateFormatted instanceof Date && !isNaN(endDateFormatted) ? endDateFormatted : null);
    setValue('owner', owner || '');
    setValue('status', capitalizeStatus(status));
    setValue('description', description || '');
    setValue('suggested', estimated || '');

    const onSubmit = (data: any) => {
      const statusMapping = {
        'Completed': 'completed',
        'In Progress': 'inProgress',
        'Pending': 'pending',
      };

      const emailOwner = responsiblePersonOptions?.find((o) => o?.value === data?.owner)

      const updatedFields = {
        title: data.taskName,
        description: data.description,
        email: emailOwner?.email || '',
        // @ts-ignore
        status: statusMapping[data.status] || data.status, // Map status to the correct format
      };

      // Convert dates to seconds and nanoseconds format
      const convertToSecondsAndNanoseconds = (date: any) => {
        return date
          ? {
            seconds: Math.floor(date.getTime() / 1000),
            nanoseconds: (date.getTime() % 1000) * 1e6,
          }
          : null;
      };

      // Only include owner, startDate, and endDate if they are provided
      if (data.owner) {
        // @ts-ignore
        updatedFields.owner = data.owner;
      }
      if (data.startDate) {
        // @ts-ignore
        updatedFields.startDate = convertToSecondsAndNanoseconds(data.startDate);
      }
      if (data.endDate) {
        // @ts-ignore
        updatedFields.endDate = convertToSecondsAndNanoseconds(data.endDate);
      }

      const numericTaskId = Number(id);

      if (!isNaN(numericTaskId)) {
        editTask(data, updatedFields);
      } else {
        console.error('Invalid taskId: Not a number');
      }

      closeModal();
    };

    openModal({
      customSize: '700px',
      view: (
        <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
          <div className="mb-7 flex items-center justify-between">
            <h4 className="font-semibold">Edit Task</h4>
            <Button variant="text" onClick={() => closeModal()}>Close</Button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input
                label="Task Name"
                placeholder="Enter task name"
                {...register('taskName', { required: 'Task Name is required' })}
                error={errors.taskName?.message}
              />
            </div>
            <div>
              <label className="block mb-2" htmlFor="startDatePicker">Start Date</label>
              <Controller
                name="startDate"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <DatePicker
                    selected={value}
                    onChange={onChange}
                    dateFormat="MMMM d, yyyy"
                    placeholderText="Select start date"
                    id="startDatePicker"
                    // @ts-ignore
                    error={errors.startDate?.message}
                  />
                )}
              />
            </div>
            <div>
              <label className="block mb-2" htmlFor="endDatePicker">End Date</label>
              <Controller
                name="endDate"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <DatePicker
                    selected={value}
                    onChange={onChange}
                    dateFormat="MMMM d, yyyy"
                    placeholderText="Select end date"
                    id="endDatePicker"
                    // @ts-ignore
                    error={errors.endDate?.message}
                  />
                )}
              />
            </div>
            <div>
              <Controller
                name="owner"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Select
                    dropdownClassName="z-[9999]"
                    label="Responsible Person"
                    value={value ? { value, label: value } : null}
                    // @ts-ignore
                    onChange={(selectedOption) => onChange(selectedOption.value)}
                    options={responsiblePersonOptions}
                    getOptionDisplayValue={(option) => `${option.label} - ${option.position}`}
                    error={errors.owner?.message}
                  />
                )}
              />
            </div>
            <div>
              <Controller
                name="status"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Select
                    dropdownClassName="z-[9999]"
                    label="Status"
                    value={value ? { value, label: value } : null}
                    // @ts-ignore
                    onChange={(selectedOption) => onChange(selectedOption.value)}
                    options={[
                      { value: 'Pending', label: 'Pending' },
                      { value: 'In Progress', label: 'In Progress' },
                      { value: 'Completed', label: 'Completed' },
                    ]}
                    getOptionDisplayValue={(option) => option.label}
                    error={errors.status?.message}
                  />
                )}
              />
            </div>
            <div>
              <Textarea
                label="Description"
                placeholder="Enter task description"
                {...register('description')}
                error={errors.description?.message}
              />
            </div>
            <div>
              <Input
                label="Suggested Time (Days)"
                placeholder="Enter suggested time in days"
                value={estimated} // Displaying the value without editing
                disabled // Making it non-editable
              />
            </div>
            <div className="flex items-center justify-end gap-4">
              <Button variant="outline" onClick={() => closeModal()}>
                Cancel
              </Button>
              <Button type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      ),
    });
  };


  return (
    <div className="p-4">
      <TaskTable
        tasks={tasks}
        setTasks={setTasks}
        openAddTaskModal={openAddTaskModal}
        openStartTaskModal={openStartTaskModal}
        openDescriptionModal={openDescriptionModal}
        openEditTaskModal={openEditTaskModal}
        responsiblePersonOptions={responsiblePersonOptions}
      />
      {nonPendingTasks.length > 0 ? (
        <GanttChart tasks={nonPendingTasks} />
      ) : (
        <div className="p-4">No tasks available to show a Gantt chart.</div>
      )}
    </div>
  );
}

const TaskTable = ({
  tasks,
  setTasks,
  openAddTaskModal,
  openStartTaskModal,
  openDescriptionModal,
  openEditTaskModal,
  responsiblePersonOptions
}: any) => {
  const statusOptions = ['Not Started', 'In Progress', 'Completed'];
  const ownerOptions = ['Michael Scott', 'James P. Albini'];
  const { updateTaskStatus } = successionPlan();

  console.log(tasks);
  // if (tasks.length === 0) {
  //   return <div className="p-4">No tasks available.</div>;
  // }

  const getStatusClass = (status: string) => {
    if (!status) return 'text-black';
    switch (status.toLowerCase()) {
      case 'completed':
        return 'text-green-500';
      case 'inprogress':
        return 'text-blue-500';
      case 'pending':
        return 'text-gray-500';
      default:
        return 'text-black';
    }
  };

  const capitalizeStatus = (status: string) => {
    if (!status) return '-';
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'inProgress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      default:
        return '-';
    }
  };


  // const updateTaskProgress = (taskId, status) => {
  //   setTasks(tasks.map(task =>
  //     task.id === taskId
  //       ? { ...task, progress: status === 'Completed' ? 100 : status === 'In Progress' ? 50 : 0 }
  //       : task
  //   ));
  // };

  // const updateTaskOwner = (taskId, owner) => {
  //   setTasks(tasks.map(task =>
  //     task.id === taskId
  //       ? { ...task, owner }
  //       : task
  //   ));
  // };

  const formatDate = (date: any) => {
    console.log(date);

    // Check if it's a Firebase Timestamp and convert to Date
    if (date instanceof Timestamp) {
      date = date.toDate();
    } else {
      date = new Date(date.seconds * 1000).toLocaleDateString()
    }

    return date;
    // return date instanceof Date && !isNaN(date as any)
    //   ? date.toLocaleDateString()
    //   : "-";
  };

  const updateTaskStatusToComplete = (task: any) => {
    const emailOwner = responsiblePersonOptions?.find((o: any) => o?.value === task?.owner)
    const fields = {
      email: emailOwner?.email || ''
    };
    updateTaskStatus(fields, task, 'completed')

  };


  return (
    <div className="p-4">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-2 px-4 text-left font-semibold text-gray-600"></th>
            <th className="py-2 px-4 text-left font-semibold text-gray-600">Task</th>
            <th className="py-2 px-4 text-center font-semibold text-gray-600">Description</th>
            <th className="py-2 px-4 text-left font-semibold text-gray-600">Days</th>
            <th className="py-2 px-4 text-left font-semibold text-gray-600">Start Date</th>
            <th className="py-2 px-4 text-left font-semibold text-gray-600">End Date</th>
            <th className="py-2 px-4 text-left font-semibold text-gray-600">Who</th>
            <th className="py-2 px-4 text-left font-semibold text-gray-600">Status</th>
            <th className="py-2 px-4 text-left font-semibold text-gray-600"></th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task: any) => {
            const startDate = new Date(task?.startDate?.seconds * 1000).toLocaleDateString() || '-'
              ;
            console.log(startDate)
            const endDate = new Date(task?.endDate?.seconds * 1000).toLocaleDateString() || '-'

            return (
              <tr key={task.id} className="border-b">
                <td className="py-2 px-4 flex justify-center items-center">
                  {task.status && task.status.toLowerCase() !== 'pending' ? (
                    <button
                      onClick={() => openEditTaskModal(task)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <PiPencil size={20} />
                    </button>
                  ) : null}
                </td>
                <td className="py-2 px-4">{task.name}</td>
                <td className="py-2 px-4 flex justify-center items-center">
                  <button
                    onClick={() => openDescriptionModal(task)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <PiInfoDuotone size={20} />
                  </button>
                </td>
                <td className="py-2 px-4">{task.estimated || '-'}</td>
                <td className="py-2 px-4">{startDate === 'Invalid Date' ? '-' : startDate}</td>
                <td className="py-2 px-4">{endDate === 'Invalid Date' ? '-' : endDate}</td>
                <td className="py-2 px-4">{task.owner ? task.owner : '-'}</td>
                <td className={`py-2 px-4 ${getStatusClass(task.status)}`}>
                  {capitalizeStatus(task.status)}
                </td>
                <td className="py-2 px-4">
                  {task.status && task.status.toLowerCase() === 'pending' ? (
                    <button
                      onClick={() => openStartTaskModal(task)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Start Task
                    </button>
                  ) : task.status && task.status.toLowerCase() === 'inprogress' ? (
                    <button
                      onClick={() => {
                        const taskId = Number(task.id);
                        if (!isNaN(taskId)) {
                          if (window.confirm('Are you sure you want to complete this task?')) {
                            updateTaskStatusToComplete(task);
                          }
                        } else {
                          console.error("Task ID is not a valid number");
                        }
                      }}

                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Complete Task
                    </button>
                  ) : null}
                </td>
              </tr>
            )
          })}
          <tr>
            {/* <td colSpan="5" className="py-2 px-4"> */}
            {/* </td> */}
          </tr>
        </tbody>
      </table>
      <div className="flex justify-end mt-4">
        <button
          onClick={openAddTaskModal}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

const CustomTaskListHeader = ({ headerHeight, rowWidth, fontFamily, fontSize }: any) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        height: headerHeight,
        fontFamily: fontFamily,
        fontSize: fontSize,
      }}
    >
      <div style={{ minWidth: rowWidth, padding: '0 10px' }}>Task</div>
      <div style={{ minWidth: rowWidth, padding: '0 10px' }}>Assignee</div>
      {/* <div style={{ minWidth: rowWidth, padding: '0 10px' }}>Start Date</div>
      <div style={{ minWidth: rowWidth, padding: '0 10px' }}>End Date</div> */}
    </div>
  );
};

const CustomTaskListTable = ({ tasks, rowHeight, fontFamily, fontSize }: any) => {
  return (
    <div>
      {tasks.map((task: any) => (
        <div
          key={task.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            height: rowHeight,
            fontFamily: fontFamily,
            fontSize: fontSize,
            borderBottom: '1px solid #ddd',
          }}
        >
          {/* First column with wrapping text and fixed width */}
          <div style={{ width: 150, padding: '0 10px', whiteSpace: 'normal', wordWrap: 'break-word' }}>
            {task.name}
          </div>

          {/* Second column centered with consistent alignment */}
          <div style={{ minWidth: 150, padding: '10px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* <img src={task.ownerPicture} alt="" className="w-6 h-6 mb-2 rounded-full" /> */}
            <span style={{ textAlign: 'center' }}>{task.owner}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

const GanttChart = ({ tasks }: any) => {
  const mappedTasks = tasks.map((task: any) => {
    // Use the function to convert the start and end dates
    const convertToDate = (timestamp: any) => {
      if (timestamp && typeof timestamp === 'object' && 'seconds' in timestamp && 'nanoseconds' in timestamp) {
        return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6);
      }
      return null; // Return null if conversion fails
    };

    const startDate = convertToDate(task.startDate);
    const endDate = convertToDate(task.endDate);

    // Ensure that the Gantt component receives dates correctly
    return {
      // @ts-ignore
      start: startDate instanceof Date && !isNaN(startDate) ? startDate : new Date(),
      // @ts-ignore
      end: endDate instanceof Date && !isNaN(endDate) ? endDate : new Date(),
      name: task.name,
      id: task.id,
      type: 'task',
      progress: task.progress || 100,
      styles: task.styles || {
        progressColor: 'rgb(254,165,177)',
        progressSelectedColor: 'rgb(254,165,177)',
      },
      owner: task.owner || '-',
      ownerPicture: task.ownerPicture || '',
    };
  });

  return (
    <div>
      <style>
        {`
           ._3zRJQ {
             display: none;
          }
        `}
      </style>
      <Gantt
        tasks={mappedTasks}
        viewMode={ViewMode.Month}
        TaskListHeader={CustomTaskListHeader}
        TaskListTable={CustomTaskListTable}
        columnWidth={120}
        rowHeight={60}
      />
    </div>
  );
};




// const GanttChart = ({ tasks }: any) => {
//   const [localTasks, setLocalTasks] = useState([]);
//   const [isLoading, setLoading] = useState(true);
//   useEffect(() => {
//     const mappedTasks = tasks.map((task: any) => {
//       // Convert Firebase Timestamps to Date objects if necessary
//       // const startDate = task.start instanceof Timestamp ? task.start.toDate() : task.start;
//       // const endDate = task.end instanceof Timestamp ? task.end.toDate() : task.end;

//       if (task?.startDate && task?.endDate) {
//         const startDate = new Date(task.startDate.seconds * 1000);
//         const endDate = new Date(task.endDate.seconds * 1000);
//         return {
//           start: new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()),
//           end: new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()),
//           name: task.name,
//           id: task.id,
//           type: 'task',
//           progress: task.progress || 100,
//           styles: task.styles || {
//             progressColor: 'rgb(35,108,149)',
//             progressSelectedColor: 'rgb(35,108,149)',
//             backgroundColor: 'rgb(35,108,149)'
//           },
//           owner: task.owner || '-',
//           ownerPicture: task.ownerPicture || '',
//         };
//       }
//       return false;
//     }).filter(Boolean);
//     setLocalTasks(mappedTasks);
//     setLoading(false);

//   }, [localTasks.length])


//   if (isLoading || localTasks.length === 0) {
//     return <div>Loading...</div>;
//   }
//   console.log('asdasd', localTasks);
//   return (
//     <div>
//       <style>
//         {`
//            ._3zRJQ {
//              display: none;
//           }
//         `}
//       </style>
//       <Gantt
//         tasks={localTasks}
//         viewMode={ViewMode.Month}
//         TaskListHeader={CustomTaskListHeader}
//         TaskListTable={CustomTaskListTable}
//         columnWidth={120}
//         rowHeight={60}
//       />
//     </div>
//   );
// };







