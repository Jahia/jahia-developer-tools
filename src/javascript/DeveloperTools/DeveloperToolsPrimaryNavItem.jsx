import React from 'react';
import {useHistory} from 'react-router';
import {useTranslation} from 'react-i18next';
import {PrimaryNavItem} from '@jahia/moonstone';
import {DevTools} from '@jahia/moonstone';
import {useSelector} from 'react-redux';
import {useNodeInfo} from '@jahia/data-helper';

export const DeveloperToolsPrimaryNavItem = () => {
    const history = useHistory();
    const {t} = useTranslation('jahia-developer-tools');
    const current = useSelector(state => ({lastVisitedPath: state.developerTools.path}));
    let route = '/developerTools';
    if (current.lastVisitedPath !== '') {
        route = current.lastVisitedPath;
    }

    const {nodes} = useNodeInfo({paths: ['/', '/modules']}, {
        getPermissions: ['developerToolsAccess', 'studioModeAccess']
    });

    if (nodes && (nodes.find(node => node.developerToolsAccess === true || node.studioModeAccess === true))) {
        return (
            <PrimaryNavItem role="developerTools-menu-item"
                            isSelected={history.location.pathname.startsWith('/developerTools')}
                            label={t('label')}
                            icon={<DevTools/>}
                            onClick={() => {
                                history.push(route);
                            }}/>
        );
    }

    return null;
};

