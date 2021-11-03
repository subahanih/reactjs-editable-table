import logo from '../resources/nord-logo.png';

function Header() {
    return (
        <div className="header">
            <h3 className="header-text">
                <img className="header-nord-icon" 
                    src={logo} alt="Nord Software"/>
                Nord Software
            </h3>
        </div>
    );
}

export default Header