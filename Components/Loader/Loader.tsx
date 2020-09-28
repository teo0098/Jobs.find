import CircularProgress from '@material-ui/core/CircularProgress';
import { memo } from 'react';

import { StyledLoader } from './styledLoader'

const Loader : React.FC = () => (
    <StyledLoader>
        <CircularProgress />
    </StyledLoader>
)

export default memo(Loader)