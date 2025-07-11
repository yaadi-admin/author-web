// export const BASE_URL = 'http://localhost:8080';

// CLOUD RUN Backend URL
export const BASE_URL =
  '';

  // Private Payment Server URL
  export const BASE_PAY_URL =
  '';

const environment: string = 'production';
const isTest = environment === 'test' ? true : false;

export const KAREN_ID = isTest
  ? 'asst_ECEcuc1jmmcLZBjmmYNdBFjG'
  : 'asst_ECEcuc1jmmcLZBjmmYNdBFjG';
export const ROSETTA_ID = isTest
  ? 'asst_eiJ3mSWAUpVS9pthyI481wcB'
  : 'asst_eiJ3mSWAUpVS9pthyI481wcB';

export const JEN_ID = isTest
  ? 'asst_HsmQmvLYVryWpnP2l5qFK8ge'
  : 'asst_piKtIBeya4hAy80TQ10o5OCX';
export const DYLAN_ID = isTest
  ? 'asst_sJqTYElyiRgr6zevIJ3GYw7X'
  : 'asst_sJqTYElyiRgr6zevIJ3GYw7X';
export const FINN_ID = isTest
  ? 'asst_vuYJmPDyFT2L6l8I09j7WcRE'
  : 'asst_jPtPyLs7ILtupBpPuAaJCv3p';

export const SIMON_ID = isTest
  ? 'asst_vA1Oop3PJM8jbtNVGadRRn6s'
  : 'asst_vA1Oop3PJM8jbtNVGadRRn6s';

export const EVE_ID = isTest
  ? 'asst_ygOWFSIuyuQG4w0CkYFs9jdH'
  : 'asst_ygOWFSIuyuQG4w0CkYFs9jdH';

export const assistantImg: any = {
  [DYLAN_ID]:
    'https://firebasestorage.googleapis.com/v0/b/yaadi-ltd.appspot.com/o/agent.png?alt=media&token=d48beee3-95b7-4eb8-b143-9b464e1368e2',
  [FINN_ID]:
    'https://firebasestorage.googleapis.com/v0/b/yaadi-ltd.appspot.com/o/agent.png?alt=media&token=d48beee3-95b7-4eb8-b143-9b464e1368e2',
  [JEN_ID]:
    'https://firebasestorage.googleapis.com/v0/b/yaadi-ltd.appspot.com/o/agent.png?alt=media&token=d48beee3-95b7-4eb8-b143-9b464e1368e2',
  [SIMON_ID]:
    'https://firebasestorage.googleapis.com/v0/b/yaadi-ltd.appspot.com/o/agent.png?alt=media&token=d48beee3-95b7-4eb8-b143-9b464e1368e2',
  // 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/bots%2Fbotsv2%2FDALL_E_2024-10-28_18.18.39_-_A_young_tech_incubator_manager__who_is_ethnically_ambiguous__friendly__and_middle-aged._The_person_is_in_a_casual_business_environment__wearing_a_smar-removebg-preview.png?alt=media&token=7e48618c-dfa1-4d4b-a68e-fa989c9fbe90',
  // 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/bots%2Fbotsv2%2FA_realistic_portrait_of_a_professional-looking_man_in_png_format-removebg-preview.png?alt=media&token=facfffc7-91e4-41dd-899d-85eede8d0cce',
  // 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/bots%2Fbotsv2%2FJen_Dialogue-removebg%20(2).png?alt=media&token=bed96975-f574-4493-b87a-ba6b414b5166',
};

export const assistantImgs = {
  [JEN_ID]: {
    happiness:
      'https://firebasestorage.googleapis.com/v0/b/yaadi-ltd.appspot.com/o/agent.png?alt=media&token=d48beee3-95b7-4eb8-b143-9b464e1368e2',
    neutral:
      'https://firebasestorage.googleapis.com/v0/b/yaadi-ltd.appspot.com/o/agent.png?alt=media&token=d48beee3-95b7-4eb8-b143-9b464e1368e2',
    retrieving:
      'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/bots%2Fbotsv2%2Fjen-writing.png?alt=media&token=ff70d273-1353-405f-944b-50eb318ddb17',
    sadness:
      'https://firebasestorage.googleapis.com/v0/b/yaadi-ltd.appspot.com/o/agent.png?alt=media&token=d48beee3-95b7-4eb8-b143-9b464e1368e2',
    surprise:
      'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/bots%2Fsimon%2Fsadness.png?alt=media&token=edd44a3e-ffc6-4201-870e-c4f8965fcab4',
    thinking:
      'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/bots%2Fbotsv2%2Fjen-thinking.png?alt=media&token=559a1cfd-7196-4e15-8cda-47ae3cd20deb',
  },
  [DYLAN_ID]: {
    happiness:
      'https://firebasestorage.googleapis.com/v0/b/yaadi-ltd.appspot.com/o/29%205.png?alt=media&token=2aea7945-f90c-4a65-bdc3-3553491f0c94',
    neutral:
      'https://firebasestorage.googleapis.com/v0/b/yaadi-ltd.appspot.com/o/29%205.png?alt=media&token=2aea7945-f90c-4a65-bdc3-3553491f0c94',
    retrieving:
      'https://firebasestorage.googleapis.com/v0/b/yaadi-ltd.appspot.com/o/29%205.png?alt=media&token=2aea7945-f90c-4a65-bdc3-3553491f0c94',
    sadness:
      'https://firebasestorage.googleapis.com/v0/b/yaadi-ltd.appspot.com/o/29%205.png?alt=media&token=2aea7945-f90c-4a65-bdc3-3553491f0c94',
    surprise:
      'https://firebasestorage.googleapis.com/v0/b/yaadi-ltd.appspot.com/o/29%205.png?alt=media&token=2aea7945-f90c-4a65-bdc3-3553491f0c94',
    thinking:
      'https://firebasestorage.googleapis.com/v0/b/yaadi-ltd.appspot.com/o/29%205.png?alt=media&token=2aea7945-f90c-4a65-bdc3-3553491f0c94',
    // https://firebasestorage.googleapis.com/v0/b/yaadi-ltd.appspot.com/o/Person%3DMattew%2C%20Skin%20Tone%3DWhite%2C%20Posture%3D28%20Thinking.png?alt=media&token=8fae9329-593a-4f20-b778-8bf2b5b1789d
  },
};

export const aigentUrls: any = {
  diana: {
    url: `${BASE_URL}/api/diana/processDiana`,
    promptKey: 'promptDiana',
  },
  jane: {
    url: `${BASE_URL}/api/jane/processJane`,
    promptKey: 'promptJane',
  },
  finn: {
    url: `${BASE_URL}/api/finn/processFinn`,
    promptKey: 'promptFinn',
  },
  rosetta: {
    url: `${BASE_URL}/api/rosetta/processRosetta`,
    promptKey: 'promptRosetta',
  },
};

export const assistantName: any = {
  [DYLAN_ID]: 'Dylan',
  [FINN_ID]: 'Finn',
  [JEN_ID]: 'Jen',
  [SIMON_ID]: 'Simon',
};

export const DYLAN_VOICE = 'echo';
export const FINN_VOICE = 'echo';
export const JEN_VOICE = 'nova';
export const SIMON_VOICE = 'fable';
export const checkVoice = (assistantId: string) => {
  if (assistantId === DYLAN_ID) {
    return DYLAN_VOICE;
  } else if (assistantId === FINN_ID) {
    return FINN_VOICE;
  } else if (assistantId === JEN_ID) {
    return JEN_VOICE;
  } else if (assistantId === SIMON_ID) {
    return SIMON_VOICE;
  } else {
    return DYLAN_VOICE;
  }
};

const Config = {
  BASE_URL,
};

export default Config;
