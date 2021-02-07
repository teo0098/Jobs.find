import CircularProgress from '@material-ui/core/CircularProgress';
import { memo } from 'react';

import { StyledLoader } from './styledLoader'
import LoaderProps from './loaderProps'

const Loader : React.FC<LoaderProps> = ({ light }) => (
    <StyledLoader light={light} id='loader'>
        <CircularProgress />
    </StyledLoader>
)

export default memo(Loader)