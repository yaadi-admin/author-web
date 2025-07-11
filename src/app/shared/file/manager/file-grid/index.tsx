'use client';

import { Loader } from 'rizzui';
import { fileGridData } from '@/data/file-grid-data';
import { useGrid } from '@/app/shared/file/manager/file-grid/use-grid';
import { Card } from '@/app/shared/file/manager/file-grid/grid';
import FolderIcon from '@/components/icons/folder-solid';
import { useRouter } from 'next/navigation';

const tableDataPerPage = 30;

export default function FileGrid() {
  const {
    isLoading,
  } = useGrid(fileGridData, tableDataPerPage);

  const { push } = useRouter();
  if (isLoading) {
    return (
      <div className="grid h-32 flex-grow place-content-center items-center">
        <Loader variant="spinner" size="xl" />
      </div>
    );
  }

  const folders = [
    {
      id: 'legal',
      title: 'Legal',
      file: {
        name: 'Legal',
        image: <FolderIcon />,
      }
    },
    {
      id: 'financial',
      title: 'Financial',
      file: {
        name: 'Financial',
        image: <FolderIcon />,
      }
    },
    {
      id: 'operational',
      title: 'Operational',
      file: {
        name: 'Operational',
        image: <FolderIcon />,
      }
    },
    {
      id: 'dealDocs',
      title: 'Deal Docs',
      file: {
        name: 'Deal Docs',
        image: <FolderIcon />,
      }
    }
  ]

  return (
    <div className='grid grid-cols-2 gap-10 w-3/4'>
      {
        folders.map(folder =>
          <div key={folder.id} className='cursor-pointer' onClick={() => {
            push(`/file-manager/${folder.id}`)
          }}>
            <Card
              key={folder.id}
              item={folder}
              onDeleteItem={() => null}
              showPopover={false}
              className="min-w-[273px] hover:-translate-y-0 hover:shadow-none"
            />
          </div>
        )
      }
    </div>

  );
}
