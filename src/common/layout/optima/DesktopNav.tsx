import * as React from 'react';
import Router from 'next/router';

import type { SxProps } from '@mui/joy/styles/types';
import { Divider, Tooltip } from '@mui/joy';
import MenuIcon from '@mui/icons-material/Menu';

import { useModelsStore } from '~/modules/llms/store-llms';

import { AgiSquircleIcon } from '~/common/components/icons/AgiSquircleIcon';
import { checkDivider, checkVisibileIcon, NavItemApp, navItems } from '~/common/app.nav';
import { themeZIndexDesktopNav } from '~/common/app.theme';
import { useUXLabsStore } from '~/common/state/store-ux-labs';

import { BringTheLove } from './components/BringTheLove';
import { DesktopNavGroupBox, DesktopNavIcon, navItemClasses } from './components/DesktopNavIcon';
import { InvertedBar, InvertedBarCornerItem } from './components/InvertedBar';
import { useOptimaDrawers } from './useOptimaDrawers';
import { useOptimaLayout } from './useOptimaLayout';

import { ListDivider, ListItemDecorator, MenuItem, Typography, useColorScheme } from '@mui/joy';
import { Box, IconButton, styled } from '@mui/joy';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const desktopNavBarSx: SxProps = {
  zIndex: themeZIndexDesktopNav,
};


export function DesktopNav(props: { component: React.ElementType, currentApp?: NavItemApp }) {

  // external state
  const {
    isDrawerOpen, toggleDrawer,
  } = useOptimaDrawers();
  const {
    showPreferencesTab, openPreferencesTab,
    showModelsSetup, openModelsSetup,
  } = useOptimaLayout();
  const noLLMs = useModelsStore(state => !state.llms.length);
  // ignore the return value, this just makes sure that the nav is refreshed when UX Labs change - while "drawing" is in there
  const labsDrawing = useUXLabsStore(state => state.labsDrawing);


  // show/hide the pane when clicking on the logo
  const appUsesDrawer = !props.currentApp?.hideDrawer;
  const logoButtonTogglesPane = (appUsesDrawer && !isDrawerOpen) || isDrawerOpen;
  const handleLogoButtonClick = React.useCallback(() => {
    if (logoButtonTogglesPane)
      toggleDrawer();
  }, [logoButtonTogglesPane, toggleDrawer]);

  const { mode: colorMode, setMode: setColorMode } = useColorScheme();

  const handleToggleDarkMode = (event: React.MouseEvent) => {
    event.stopPropagation();
    setColorMode(colorMode === 'dark' ? 'light' : 'dark');
  };


  // App items
  const navAppItems = React.useMemo(() => {
    return navItems.apps
      .filter(_app => checkVisibileIcon(_app, false, props.currentApp) && !_app.name.toLowerCase().includes('call') 
        && !_app.name.toLowerCase().includes('news') 
        && !_app.name.toLowerCase().includes('personas'))
      .map((app, appIdx) => {
        const isActive = app === props.currentApp;
        const isDrawerable = isActive && !app.hideDrawer;
        const isPaneOpen = isDrawerable && isDrawerOpen;

        if (checkDivider(app))
          return <Divider key={'div-' + appIdx} sx={{ my: 1, width: '50%', mx: 'auto' }} />;

        return (
          <Tooltip key={'n-m-' + app.route.slice(1)} disableInteractive enterDelay={600} title={app.name}>
            <DesktopNavIcon
              variant={isActive ? 'solid' : undefined}
              onClick={isDrawerable ? toggleDrawer : () => Router.push(app.landingRoute || app.route)}
              className={`${navItemClasses.typeApp} ${isActive ? navItemClasses.active : ''} ${isPaneOpen ? navItemClasses.paneOpen : ''}`}
            >
              {/*{(isActive && app.iconActive) ? <app.iconActive /> : <app.icon />}*/}
              <app.icon />
            </DesktopNavIcon>
          </Tooltip>
        );
      });
  }, [props.currentApp, isDrawerOpen, labsDrawing, toggleDrawer]);


  // External link items
  const navExtLinkItems = React.useMemo(() => {
    return navItems.links.map((item, index) =>
      <BringTheLove
        key={'nav-ext-' + item.name}
        asIcon
        text={item.name}
        icon={item.icon}
        link={item.href}
        sx={{
          p: 1,
          mb: index > 0 ? 1 : 0,
        }}
      />,
    );
  }, []);


  // Modal items
  const navModalItems = React.useMemo(() => {
    return navItems.modals.map(item => {

      // map the overlayId to the corresponding state and action
      const stateActionMap: { [key: string]: { isActive: boolean, showModal: () => void } } = {
        settings: { isActive: !!showPreferencesTab, showModal: () => openPreferencesTab() },
        models: { isActive: showModelsSetup, showModal: openModelsSetup },
        0: { isActive: false, showModal: () => console.log('Action missing for ', item.overlayId) },
      };
      const { isActive, showModal } = stateActionMap[item.overlayId] ?? stateActionMap[0];

      // attract the attention to the models configuration when no LLMs are available (a bit hardcoded here)
      const isAttractive = noLLMs && item.overlayId === 'models';

      return (
        <Tooltip followCursor key={'n-m-' + item.overlayId} title={isAttractive ? 'Add Language Models - REQUIRED' : item.name}>
          <DesktopNavIcon
            variant={isActive ? 'soft' : undefined}
            onClick={showModal}
            className={`${navItemClasses.typeLinkOrModal} ${isActive ? navItemClasses.active : ''} ${isAttractive ? navItemClasses.attractive : ''}`}
          >
            {(isActive && item.iconActive) ? <item.iconActive /> : <item.icon />}
          </DesktopNavIcon>
        </Tooltip>
      );
    });
  }, [noLLMs, openModelsSetup, openPreferencesTab, showModelsSetup, showPreferencesTab]);


  return (
    <InvertedBar
      id='desktop-nav'
      component={props.component}
      direction='vertical'
      sx={desktopNavBarSx}
    >

      <InvertedBarCornerItem>
        <Tooltip title={isDrawerOpen ? 'Close Drawer' /* for Aria reasons */ : 'Open Drawer'}>
          <DesktopNavIcon disabled={!logoButtonTogglesPane} onClick={handleLogoButtonClick}>
            {logoButtonTogglesPane ? <MenuIcon /> : <AgiSquircleIcon inverted sx={{ color: 'white' }} />}
          </DesktopNavIcon>
        </Tooltip>
      </InvertedBarCornerItem>

          <DesktopNavGroupBox>

      <IconButton
        variant='outlined'
        onClick={handleToggleDarkMode}
        sx={{ ml: 'auto' }}
      >
        {colorMode !== 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
      </DesktopNavGroupBox>

{/*
      <DesktopNavGroupBox>
        {navAppItems}
      </DesktopNavGroupBox>

      <DesktopNavGroupBox sx={{ mb: 'calc(2 * var(--GroupMarginY))' }}>
        {navExtLinkItems}
        {navModalItems}
      </DesktopNavGroupBox>

  */}
    </InvertedBar>
  );
}