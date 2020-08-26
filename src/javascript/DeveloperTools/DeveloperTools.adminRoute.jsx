import React from 'react';

import {registry} from '@jahia/ui-extender';
import {Studio, OpenInNew} from "@jahia/moonstone";

export const registerAdminRoute = () => {
    registry.add('adminRoute', 'studio', {
        targets: ['developerTools:10'],
        icon: <Studio/>,
        iconEnd: <OpenInNew/>,
        label: 'jahia-developer-tools:studio',
        isSelectable: false,
        onClick: () => window.open(window.contextJsParameters.contextPath + '/cms/studio/default/en/settings.manageModules.html')
    });
};

