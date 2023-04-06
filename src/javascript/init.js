import {registerDeveloperTools} from './DeveloperTools/register';
import {developerToolsRedux} from './DeveloperTools/DeveloperTools.redux';

export default function () {
    if (window.contextJsParameters.config.operatingMode === 'development') {
        developerToolsRedux();
        registerDeveloperTools();
    }
}

