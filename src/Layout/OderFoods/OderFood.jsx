import { Helmet } from "react-helmet-async";
import Cover from "../../pages/SharedPages/Covers/Cover";
import img from "../../assets/shop/banner2.jpg";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState } from "react";
import useMenu from "../../hooks/useMenu";
import Card from "../../pages/SharedPages/Cards/Card";
import { useParams } from "react-router-dom";
import OderFoodCards from "./OderFoodCards";
const OderFood = () => {
  const categories = ['salad','pizza','soup','dessert','drink'];
  const {category} = useParams();
  const initialIndex = categories.indexOf(category);
  
    const [index,setIndex] = useState(initialIndex);
    const [items] = useMenu();
    
    const salad = items.filter(item=> item.category=== 'salad' )
    const pizza = items.filter(item=> item.category=== 'pizza' )
    const soup = items.filter(item=> item.category=== 'soup' )
    const dessert = items.filter(item=> item.category=== 'dessert' )
    const drinks = items.filter(item=> item.category=== 'drinks' )
  return (
    <div>
      <Helmet>
        <title>Boss | Orders</title>
      </Helmet>
      <Cover
        img={img}
        head={"Our shop"}
        subHead={"Would you like to try a dish?"}
      ></Cover>

      <Tabs className={'text-center py-2'} defaultIndex={index} onSelect={(index) => setIndex(index)}>
        <TabList>
          <Tab>Salad</Tab>
          <Tab>Pizza</Tab>
          <Tab>Soups</Tab>
          <Tab>Desserts</Tab>
          <Tab>Drinks</Tab>
        </TabList>
        <TabPanel>
        <OderFoodCards items={salad}></OderFoodCards>
        </TabPanel>
        <TabPanel>
          <OderFoodCards items={pizza}></OderFoodCards>
        </TabPanel>
        <TabPanel>
            <OderFoodCards items={soup}></OderFoodCards>
        </TabPanel>
        <TabPanel>
            <OderFoodCards items={dessert}></OderFoodCards>
        </TabPanel>
        <TabPanel>
          <OderFoodCards items={drinks}></OderFoodCards>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default OderFood;
