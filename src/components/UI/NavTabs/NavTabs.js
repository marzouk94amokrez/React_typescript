import { NavTabsLi, NavTabsLineBar, NavTabsLink, NavTabsUl } from './NavTabs.styled';

function NavTabs({ tabsList, activeTab, onTabClick, linkTo }) {
  return (
    <NavTabsUl>
      {
        tabsList.map((tab, index) => {
          return (
            <NavTabsLi key={index}>
              <NavTabsLink
                onClick={() => onTabClick(tab.value)}
                active={tab.value === activeTab}
                to={linkTo ? linkTo(tab.value) : `#${tab.value}`}
              >
                {tab.title}
              </NavTabsLink>
              <NavTabsLineBar active={tab.value === activeTab}>
              </NavTabsLineBar>
            </NavTabsLi>
          )
        })
      }
    </NavTabsUl>
  );
}

export default NavTabs;
