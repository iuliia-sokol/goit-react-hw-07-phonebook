import { RotatingTriangles } from 'react-loader-spinner';

import { LoaderOverlay } from './Loader.styled';

export const Loader = () => {
  return (
    <LoaderOverlay>
      <RotatingTriangles
        visible={true}
        height="180"
        width="180"
        ariaLabel="rotating-triangels-loading"
        wrapperStyle={{ position: 'absolute', top: '30%' }}
        wrapperClass="rotating-triangels-wrapper"
        colors={['#c47436', '#733c14', '#f1e46d']}
      />
    </LoaderOverlay>
  );
};
