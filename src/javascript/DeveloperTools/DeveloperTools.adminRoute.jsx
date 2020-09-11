import React from 'react';

import {registry} from '@jahia/ui-extender';
import {OpenInNew, Studio} from '@jahia/moonstone';

export const registerAdminRoute = () => {
    registry.add('adminRoute', 'studio', {
        targets: ['developerTools:10'],
        icon: <Studio/>,
        iconEnd: <OpenInNew/>,
        requiredPermission: 'studioModeAccess',
        label: 'jahia-developer-tools:studio',
        isSelectable: false,
        onClick: () => window.open(window.contextJsParameters.contextPath + '/cms/studio/default/en/settings.manageModules.html')
    });
};

