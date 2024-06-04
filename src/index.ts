import { exportFromDune } from './exportAddress';

exportFromDune()
  .then(() => {
    console.log('Exported data saved to: output/dune_export.csv');
  })
  .catch((error) => {
    console.error('Export from Dune failed:', error);
  });
