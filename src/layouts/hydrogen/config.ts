import firebase from '@/config/firebase.config';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

function findLogoConfig(dba: string | undefined) {
  if (dba && ['rumin8-testing'].includes(dba)) {
    return 'https://firebasestorage.googleapis.com/v0/b/yaadi-ltd.appspot.com/o/biz-logo.png?alt=media&token=1990b393-0954-4fa4-869b-ecaeed09ba50';
  } else {
    return 'https://firebasestorage.googleapis.com/v0/b/yaadi-ltd.appspot.com/o/biz-logo.png?alt=media&token=1990b393-0954-4fa4-869b-ecaeed09ba50';
  }
}
export async function findLogo(currentUser: any) {
  if (currentUser.role === 'advisor') {
    const dba = await findAdvisorIntake(currentUser.id);
    return findLogoConfig(dba);
  } else if (currentUser.role === 'client') {
    const dba = await findAdvisorCompanyName(currentUser.id);
    return findLogoConfig(dba);
  } else {
    return findLogoConfig(undefined);
  }
}

export async function findDba(currentUser: any) {
  if (currentUser.role === 'advisor') {
    const dba = await findAdvisorIntake(currentUser.id);
    return dba;
  } else if (currentUser.role === 'client') {
    const dba = await findAdvisorCompanyName(currentUser.id);
    return dba;
  } else {
    return 'Narro';
  }
}

async function findAdvisorCompanyName(clientId: string) {
  const docRef = doc(firebase.firestore, 'succession_plan', clientId);
  const response = await getDoc(docRef);
  if (response) {
    return findAdvisorIntake(response.data()?.advisorID);
  }
}

async function findAdvisorIntake(advisorId: string) {
  if (advisorId) {
    const q = query(
      collection(firebase.firestore, 'intakes'),
      where('userID', '==', advisorId)
    );
    const querySnapshot = await getDocs(q);
    const dataFields = querySnapshot.docs.map((doc) => doc.data());
    const dba = dataFields?.[0]?.dba;
    return dba;
  } else {
    return 'Narro';
  }
}
