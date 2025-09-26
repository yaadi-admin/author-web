import { injectInitialWorkshops } from '../data/workshops';

/**
 * Utility to seed Firestore with initial workshop data
 * This function will populate the 'workshops' collection with sample data.
 * 
 * Usage in browser console:
 * window.seedWorkshops();
 * 
 * Usage in code:
 * import { seedWorkshopsData } from './utils/seedWorkshops';
 * await seedWorkshopsData();
 */
export const seedWorkshopsData = async (): Promise<void> => {
  try {
    console.log('🌱 Starting to seed Firestore with workshop data...\n');
    
    await injectInitialWorkshops();
    
    console.log('\n🎉 Workshop data has been successfully injected into Firestore!');
    console.log('🎪 Workshops are now available in the "workshops" collection');
    console.log('\nYou can now:');
    console.log('• Visit /workshops to see the workshop events');
    console.log('• Visit /admin to manage workshop content');
    
  } catch (error) {
    console.error('❌ Error seeding Firestore with workshop data:', error);
    throw error;
  }
};

// Make function available globally for console usage
if (typeof window !== 'undefined') {
  // @ts-ignore
  window.seedWorkshops = seedWorkshopsData;
  
  console.log('🔧 Workshop seed function is available globally:');
  console.log('• seedWorkshops() - inject initial workshop data');
}
