import React from 'react';
import SectionTitles from '../../SharedPages/sectiontitles/SectionTitles';
import CardsSweppers from '../../SharedPages/Cards/CardsSweppers';

const Chef = () => {
    return (
        <div>
            <SectionTitles heading={'CHEF RECOMMENDS'} subHeading={'Should Try'}></SectionTitles>
          <CardsSweppers></CardsSweppers>
        </div>
    );
};

export default Chef;