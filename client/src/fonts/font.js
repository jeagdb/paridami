import { createGlobalStyle } from 'styled-components';

import Poppins from './Poppins-Regular.woff';

export default createGlobalStyle`
    @font-face {
        font-family: 'Font Name';
        src: local('Font Name'), local('FontName'),
        url(${Poppins}) format('woff')
        font-weight: 300;
        font-style: normal;
    }
`;