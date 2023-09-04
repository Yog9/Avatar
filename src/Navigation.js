import React, { useEffect, useCallback, useState } from "react";
import throttle from "lodash/throttle";

const Navigation = (props) => {
  const { fullNavArray } = props;
  const [isShown, setIsShown] = useState(false);
  const [priorityItems, setPriorityItems] = React.useState([]);
  const [moreItems, setMoreItems] = React.useState([]);
  const navigation = React.useRef(null);
  const navigationOuter = React.useRef(null);
  const more = React.useRef(null);
  const nav = React.useRef(null);
  const [widthsArr, setWidthsArr] = React.useState([]);
  const handleMouseOver =()=>{
    setIsShown(true)
  }
  const handleMouseOut =()=>{
    setIsShown(false)
  }
useEffect(() => {
    if (!navigation.current) return;
    const items = [...navigation.current.children];
    const itemsArr = items.map((item) => item.getBoundingClientRect().width);
    setWidthsArr(itemsArr);
  }, [navigation.current]);

  const updateNavigation = useCallback(() => {
    // Get width of all items in navigation menu
    const outerWidth = navigationOuter.current.getBoundingClientRect().width;
    const moreMenu = more.current
      ? more.current.getBoundingClientRect().width
      : 0;
    const arrayAmount = howManyItemsInMenuArray(
      widthsArr,
      outerWidth,
      moreMenu,
      2
    );
    const navItemsCopy = fullNavArray;
    const priorityItems = navItemsCopy.slice(0, arrayAmount);

    setPriorityItems(priorityItems);
    setMoreItems(
      priorityItems.length !== navItemsCopy.length
        ? navItemsCopy.slice(arrayAmount, navItemsCopy.length)
        : []
    );
  }, [fullNavArray, widthsArr]);


  useEffect(() => {
    setPriorityItems(fullNavArray);
  }, [fullNavArray]);

  useEffect(() => {
    const handleResize = throttle(() => {
      updateNavigation();
    }, 200);

    let resizeId;
    //Add resize listener but throttle for smoother experience
    window.addEventListener(
      "resize",
      handleResize
    );
    updateNavigation();

    return () => {
      //cleanup event listener
      window.removeEventListener("resize", handleResize);
    };
  }, [updateNavigation]);

  const howManyItemsInMenuArray = (
    array,
    outerWidth,
    initialWidth,
    minimumNumberInNav
  ) => {
    let total = Math.floor(initialWidth * 1.75);
    for (let i = 0; i < array.length; i++) {
      if (total + array[i] > outerWidth) {
        return i < minimumNumberInNav ? minimumNumberInNav : i;
      } else {
        total += array[i];
      }
    }
  };

  return (
    <div className="navigation-container">
      <div ref={navigationOuter} className="navigation" role="navigation">
        <ul ref={navigation} className="navigation-list">
          {priorityItems.map((item, i) => (
            <li key={`navItem-${i}`} className="navigation-item">
              <div className="navigation-link">
                {item.title}
              </div>
            </li>
          ))}
        </ul>
        {moreItems.length > 0 && (
          <div ref={more} className="navigation-list-absolute" onMouseOver={handleMouseOver} onMouseLeave ={handleMouseOut}>
            <div className="navigation-item more-item">
              <div className="navigation-link">
                More &gt;
              </div>
             
              <div ref={nav}  className={
        "more-navigation " +
        (isShown ? "show_navigation " : "not_show ")
      }>
                {moreItems.map((item, i) => (
                  <div key={`moreNavItem-${i}`} className="navigation-item">
                    <div className="navigation-link" >
                      {item.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;
