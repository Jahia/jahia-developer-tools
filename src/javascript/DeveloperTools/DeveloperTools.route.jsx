import React from 'react';
import {registry} from '@jahia/ui-extender';
import {DeveloperTools} from './DeveloperTools';

export const registerRoute = () => {
    registry.add('route', 'routeDeveloperTools', {
        targets: ['main:1'],
        path: '/developerTools*',
        defaultPath: '/developerTools',
        render: v => <DeveloperTools match={v.match}/>
    });
};

console.debug('%c Jahia Developer Tools is activated', 'color: #3c8cba');
