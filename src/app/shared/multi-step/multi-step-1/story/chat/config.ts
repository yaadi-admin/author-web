// export const BASE_URL = 'http://localhost:8080';

// CLOUD RUN
import Config from '@/config/bots';
export const BASE_URL = Config.BASE_URL;

const environment: string = 'production';
const isTest = environment === 'test' ? true : false;

export const KAREN_ID = isTest
  ? 'asst_ECEcuc1jmmcLZBjmmYNdBFjG'
  : 'asst_ECEcuc1jmmcLZBjmmYNdBFjG';
export const ROSETTA_ID = isTest
  ? 'asst_HYv8hXL83WoSQLjJn0sSKDvw'
  : 'asst_Ro8ljcSTHIhc2UbiYdIJpggl';

export const JEN_ID = isTest
  ? 'asst_HsmQmvLYVryWpnP2l5qFK8ge'
  : 'asst_piKtIBeya4hAy80TQ10o5OCX';
export const DYLAN_ID = isTest
  ? 'asst_2MrR0728BRmHygKIAXCMYQmg'
  : 'asst_LsJSVurR1UlKsN1NOBxgWwcW';
export const FINN_ID = isTest
  ? 'asst_vuYJmPDyFT2L6l8I09j7WcRE'
  : 'asst_jPtPyLs7ILtupBpPuAaJCv3p';

export const assistantImg: any = {
  dylan:
    'https://firebasestorage.googleapis.com/v0/b/yaadi-ltd.appspot.com/o/agent.png?alt=media&token=84eda229-ee0a-428b-9e65-4e23e6ad517b',
  finn: 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/bots%2F_Finn%20Final%20-%20Transparent%202.png?alt=media&token=a4727af5-a09d-4cc5-afa2-ceaf7887069e',
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
};

export const DYLAN_VOICE = 'onyx';
export const FINN_VOICE = 'echo';
export const JEN_VOICE = 'nova';
export const checkVoice = (assistantId: string) => {
  if (assistantId === DYLAN_ID) {
    return DYLAN_VOICE;
  } else if (assistantId === FINN_ID) {
    return FINN_VOICE;
  } else if (assistantId === JEN_ID) {
    return JEN_VOICE;
  } else {
    return DYLAN_VOICE;
  }
};

export const identifyVoice = (name: string) => {
  if (name === 'dylan') {
    return DYLAN_VOICE;
  } else if (name === 'finn') {
    return FINN_VOICE;
  } else if (name === 'jen') {
    return JEN_VOICE;
  }
};
