import React, { useState } from 'react';
import dayjs from 'dayjs';

import '../../styles/note-app.css'
import Transcript from './transcript';
import { HiMiniTrash } from "react-icons/hi2";

import { marked } from 'marked';
const Note = ({ note, onDelete, index }: any) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const humanReadableDate = dayjs(note.InteractionDate).format('MMMM D, YYYY h:mm A');


  function generateHtml(data: any) {
    let markdownContent = '';

    // Loop through the main object
    for (const [key, value] of Object.entries(data)) {
      // If the value is an object, like the 'agenda'
      if (typeof value === 'object' && !Array.isArray(value)) {
        markdownContent += `### ${key}\n`;
        // @ts-ignore
        if (value) {
          for (const [subKey, subValue] of Object.entries(value)) {
            markdownContent += `- **${subKey}:** ${subValue}\n`;
          }
        }

      } else {
        // For regular key-value pairs
        markdownContent += `### ${key}\n${value}\n\n`;
      }
    }

    const md = markdownContent.split('\n').map((line, index) => {
      if (line === '') {
        return '\n';
      }
      return `${line}\n`;
    }).join('\n');
    return marked(md, { async: false });

  }







  const nextNote = (note?.FormOfCommunication || '').includes('AI') ?
    generateHtml(JSON.parse(note.Notes)) : note.Notes;


  return (
    <div className="note">
      <div
        className="note-header cursor-pointer"
        style={{
          borderRadius: !isCollapsed ? '8px 8px 0 0' : '8px',
        }}
        onClick={toggleCollapse}
      >
        <div className="flex">
          <div className='text-white text-xl'>{note.FormOfCommunication}</div>
          <div className="ml-auto text-white font-semibold">
            {humanReadableDate}
          </div>
        </div>
        <div className="text-gray-100 font-semibold">{note.peopleInvolved}</div>
      </div>

      <div
        className={`z-100 note-content transition-all duration-300 ease-in-out ${isCollapsed ? 'max-h-0 opacity-0 ' : 'max-h-[400px] overflow-y-auto opacity-100 p-[10px]'
          }`}
      >
        {!isCollapsed &&
          <p className='biz-note'>
            <p className="biz-note" dangerouslySetInnerHTML={{ __html: nextNote }}></p>
            <Transcript transcript={(JSON.parse(note?.transcript || '[]'))} />

          </p>
        }
      </div>
      {isCollapsed && (note?.FormOfCommunication || '').includes('AI') && (
        <button
          className="delete-button"
          onClick={() => onDelete(note, index)}
        >
          <HiMiniTrash size={16} color="white" />
        </button>
      )}
    </div>


  );
};

export default Note;
