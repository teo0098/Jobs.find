import CircularProgress from '@material-ui/core/CircularProgress';
import { memo } from 'react';

import { StyledLoader } from './styledLoader'

const Loader : React.FC = () => (
    <StyledLoader id='loader'>
        <CircularProgress />
    </StyledLoader>
)

export default memo(Loader)