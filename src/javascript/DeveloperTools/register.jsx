import React from 'react';
import {registerRoute} from './DeveloperTools.route';
import {registerAdminRoute} from './DeveloperTools.adminRoute';
import {registry} from '@jahia/ui-extender';
import {DeveloperToolsPrimaryNavItem} from './DeveloperToolsPrimaryNavItem';

export const registerDeveloperTools = () => {
    registerRoute();
    registerAdminRoute();
    registry.add('primary-nav-item', 'developerTools', {
        targets: ['nav-root-top:3'],
        render: () => <DeveloperToolsPrimaryNavItem/>
    });
};

