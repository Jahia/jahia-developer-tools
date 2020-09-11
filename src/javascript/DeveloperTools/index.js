import {registerDeveloperTools} from './register';
import {developerToolsRedux} from './DeveloperTools.redux';

if (window.contextJsParameters.config.operatingMode === 'development') {
    developerToolsRedux();
    registerDeveloperTools();
}
