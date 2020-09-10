import Navigation from '../Navigation/Navigation'
import Footer from '../Footer/Footer'
import StyledLayout from './styledLayout'

const Layout : React.FC = ({ children }) => (
    <StyledLayout>
        <div>
            <Navigation />
            {children}
        </div>
        <Footer />
    </StyledLayout>
)

export default Layout