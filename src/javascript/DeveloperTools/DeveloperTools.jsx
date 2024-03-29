import React from 'react';
import {registry, useAdminRouteTreeStructure} from '@jahia/ui-extender';
import {useNodeInfo} from '@jahia/data-helper';
import {useHistory} from 'react-router-dom';
import {Accordion, AccordionItem, LayoutModule, SecondaryNav, SecondaryNavHeader, TreeView} from '@jahia/moonstone';
import {useTranslation} from 'react-i18next';
import {Route, Switch} from 'react-router';
import PropTypes from 'prop-types';
import {Build} from '@jahia/moonstone';
import DeveloperToolsEmpty from './DeveloperTools.empty';

const getPageId = match => {
    let matchByRoute = registry.find({type: 'adminRoute', route: match.url});
    if (matchByRoute.length > 0) {
        return matchByRoute[0].key;
    }

    let param = match.params[0];

    let item = param.substr(1);
    if (registry.get('adminRoute', item)) {
        return item;
    }
};

export const DeveloperTools = ({match}) => {
    const history = useHistory();
    const {t} = useTranslation('jahia-developer-tools');

    const selectedPage = getPageId(match);
    const {tree, routes, defaultOpenedItems, allPermissions} = useAdminRouteTreeStructure('developerTools', selectedPage);
    const {nodes} = useNodeInfo({paths: ['/', '/modules']}, {
        getPermissions: allPermissions
    });

    const data = tree
        .filter(route => route.requiredPermission === undefined || (nodes && (nodes.find(node => node[route.requiredPermission] !== false))))
        .map(route => ({
            id: route.key,
            label: t(route.label),
            isSelectable: route.isSelectable,
            iconStart: route.icon,
            iconEnd: route.iconEnd,
            route: route.route,
            onClick: route.onClick,
            requiredPermission: route.requiredPermission,
            treeItemProps: {
                'data-sel-role': route.key
            }
        }))
        .getData();

    const filteredRoutes = routes && routes
        .filter(route => route.requiredPermission === undefined || (nodes && (nodes.find(node => node[route.requiredPermission] !== false))))
        .filter(route => route.isSelectable && route.render);

    return (
        <LayoutModule
            navigation={
                <SecondaryNav header={<SecondaryNavHeader>{t('label')}</SecondaryNavHeader>}>
                    <Accordion isReversed openedItem="myTools">
                        <AccordionItem id="myTools" label={t('myTools')} icon={<Build/>}>
                            <TreeView isReversed
                                      data={data}
                                      selectedItems={[selectedPage]}
                                      defaultOpenedItems={defaultOpenedItems}
                                      onClickItem={
                                          (app, event, toggleNode) => {
                                              if (app.isSelectable) {
                                                  history.push(app.route || ('/developerTools/' + app.id));
                                              } else if (app.onClick) {
                                                  app.onClick();
                                              } else {
                                                  toggleNode(event);
                                              }
                                          }
                                      }/>
                        </AccordionItem>
                    </Accordion>
                </SecondaryNav>
            }
            content={
                <Switch>
                    {filteredRoutes.map(r => (
                        <Route key={r.key}
                               exact
                               strict
                               path={r.route || '/developerTools/' + r.key}
                               render={props => r.render(props)}/>
                      )
                    )}
                    <Route exact strict path="/developerTools" component={DeveloperToolsEmpty}/>
                </Switch>
            }
        />
    );
};

DeveloperTools.propTypes = {
    match: PropTypes.object.isRequired
};

