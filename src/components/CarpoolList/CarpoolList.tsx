import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Layout} from '../Layout';
import {Image, ListItem} from 'react-native-elements';
import {EScreens} from '../Navigation/Navigation';
import {AddCarpoolButton} from './AddCarpoolButton';
import {AddCarpoolForm} from './AddCarpoolForm';

enum ECarpoolTopic {
  PREVIOUS = 'previous',
  NEXT = 'next',
  FUTURE = 'future',
}

export interface ICarpoolTripData {
  date: string;
  driver: string;
  description: string;
  driverProfileUrl?: string;
}

interface ICarpoolTrips {
  [ECarpoolTopic.NEXT]: ICarpoolTripData[];
  [ECarpoolTopic.FUTURE]: ICarpoolTripData[];
  [ECarpoolTopic.PREVIOUS]: ICarpoolTripData[];
}

const carpoolTopicTitles = {
  [ECarpoolTopic.NEXT]: 'Next trip',
  [ECarpoolTopic.FUTURE]: 'Future trips',
  [ECarpoolTopic.PREVIOUS]: 'Previous trips',
};

const initialCarpoolList: ICarpoolTrips = {
  [ECarpoolTopic.NEXT]: [
    {
      description: 'Bar crawl',
      driver: 'Georgio',
      date: '22/12/2021 8:30PM',
      driverProfileUrl:
        'https://openpsychometrics.org/tests/characters/test-resources/pics/S/2.jpg',
    },
  ],
  [ECarpoolTopic.FUTURE]: [
    {
      description: 'Gin tour',
      driver: 'Nicola',
      date: '26/12/2021 7:30PM',
      driverProfileUrl:
        'https://images.immediate.co.uk/production/volatile/sites/3/2016/03/Simpsons_g2013_R1_marge-04bf0d1.jpg?webp=true&quality=90&crop=3px%2C170px%2C1884px%2C1255px&resize=620%2C413',
    },
    {
      description: 'Rogaine',
      driver: 'Paul',
      date: '27/12/2021 1:00PM',
      driverProfileUrl:
        'https://images.immediate.co.uk/production/volatile/sites/3/2018/08/Simpsons_SO28_Gallery_11-fb0b632.jpg?webp=true&quality=90&resize=620%2C413',
    },
  ],
  [ECarpoolTopic.PREVIOUS]: [
    {
      description: 'Hike',
      driver: 'Bray',
      date: '10/12/2021 6:00PM',
      driverProfileUrl:
        'https://static.wikia.nocookie.net/p__/images/e/ec/Lisa_Simpson.png/revision/latest?cb=20160403144746&path-prefix=protagonist',
    },
    {
      description: 'Bar crawl',
      driver: 'Drinker',
      date: '02/12/2021 4:00PM',
      driverProfileUrl:
        'https://tv-fanatic-res.cloudinary.com/iu/s--SOvcg_Y0--/t_full/cs_srgb,f_auto,fl_strip_profile.lossy,q_auto:420/v1371141957/barney-gumble-pic.png',
    },
  ],
};

interface ICarpoolItem extends ICarpoolTripData, ICarpoolList {}

const CarpoolItem: React.FC<ICarpoolItem> = ({
  description,
  driver,
  date,
  driverProfileUrl,
  navigation,
}) => (
  <ListItem
    style={styles.item}
    hasTVPreferredFocus={undefined}
    tvParallaxProperties={undefined}
    bottomDivider={true}
    onPress={() => navigation.navigate(EScreens.MAP)}
  >
    <Image style={styles.driverProfileUrl} source={{uri: driverProfileUrl}} />
    <ListItem.Content>
      <ListItem.Title>{description}</ListItem.Title>
      <ListItem.Subtitle style={styles.accordionDriverText}>
        {driver}
      </ListItem.Subtitle>
      <ListItem.Subtitle>{date}</ListItem.Subtitle>
    </ListItem.Content>
    <ListItem.Chevron
      style={styles.accordionChevron}
      tvParallaxProperties={false}
    />
  </ListItem>
);

interface ICarpoolList {
  navigation: any;
}

export const CarpoolList: React.FC<ICarpoolList> = ({navigation}) => {
  const currDriver = {
    driver: 'Paul',
    driverProfileUrl:
      'https://images.immediate.co.uk/production/volatile/sites/3/2018/08/Simpsons_SO28_Gallery_11-fb0b632.jpg?webp=true&quality=90&resize=620%2C413',
  };
  const [openCarpoolForm, setOpenCarpoolForm] = React.useState<boolean>(false);
  const [carpoolList, setCarpoolList] =
    React.useState<ICarpoolTrips>(initialCarpoolList);
  const [expanded, setExpanded] = React.useState<{
    [ECarpoolTopic.FUTURE]: boolean;
    [ECarpoolTopic.PREVIOUS]: boolean;
    [ECarpoolTopic.NEXT]: boolean;
  }>({
    [ECarpoolTopic.FUTURE]: false,
    [ECarpoolTopic.PREVIOUS]: false,
    [ECarpoolTopic.NEXT]: true,
  });

  const controlAccordion = (topic: ECarpoolTopic) => {
    setExpanded({...expanded, [topic]: !expanded?.[topic]});
  };

  const controlForm = () => {
    setOpenCarpoolForm(!openCarpoolForm);
  };

  const addCarpool = (newCarpool: Omit<ICarpoolTripData, 'driver'>) => {
    setCarpoolList({
      ...carpoolList,
      [ECarpoolTopic.FUTURE]: [
        ...carpoolList?.[ECarpoolTopic.FUTURE],
        {...currDriver, ...newCarpool},
      ],
    });
  };

  return (
    <ScrollView>
      <Layout>
        <CarpoolTopicAccordion
          carpools={carpoolList[ECarpoolTopic.NEXT]}
          isExpanded={expanded?.[ECarpoolTopic.NEXT]}
          carpoolTopic={ECarpoolTopic.NEXT}
          controlAccordion={controlAccordion}
          navigation={navigation}
        />
        <CarpoolTopicAccordion
          carpools={carpoolList[ECarpoolTopic.FUTURE]}
          isExpanded={expanded?.[ECarpoolTopic.FUTURE]}
          carpoolTopic={ECarpoolTopic.FUTURE}
          controlAccordion={controlAccordion}
          navigation={navigation}
        />
        <CarpoolTopicAccordion
          carpools={carpoolList[ECarpoolTopic.PREVIOUS]}
          isExpanded={expanded?.[ECarpoolTopic.PREVIOUS]}
          carpoolTopic={ECarpoolTopic.PREVIOUS}
          controlAccordion={controlAccordion}
          navigation={navigation}
        />
        <AddCarpoolButton openForm={controlForm} />
        {openCarpoolForm && (
          <AddCarpoolForm
            controlClose={controlForm}
            isOpen={openCarpoolForm}
            addCarpool={addCarpool}
          />
        )}
      </Layout>
    </ScrollView>
  );
};

interface ICarpoolTopicAccordion {
  navigation: any;
  isExpanded: boolean;
  controlAccordion: (topic: ECarpoolTopic) => void;
  carpoolTopic: ECarpoolTopic;
  carpools: ICarpoolTripData[];
}

const CarpoolTopicAccordion: React.FC<ICarpoolTopicAccordion> = ({
  navigation,
  controlAccordion,
  carpoolTopic,
  carpools,
  isExpanded,
}) => {
  return (
    <ListItem.Accordion
      hasTVPreferredFocus={false}
      tvParallaxProperties={false}
      content={
        <View style={styles.accordion}>
          <ListItem.Title style={styles.accordionTitle}>
            {carpoolTopicTitles[carpoolTopic]}
          </ListItem.Title>
        </View>
      }
      isExpanded={isExpanded}
      onPress={() => controlAccordion(carpoolTopic)}
    >
      {carpools?.map((l, i) => (
        <CarpoolItem key={i} navigation={navigation} {...l} />
      ))}
    </ListItem.Accordion>
  );
};

const styles = StyleSheet.create({
  driverProfileUrl: {
    height: 60,
    width: 60,
    paddingLeft: 10,
  },
  accordionChevron: {
    paddingRight: 20,
  },
  accordionTitle: {
    fontWeight: 'bold',
  },
  accordionDriverText: {
    fontWeight: 'normal',
    color: '#4f4333',
  },
  accordion: {
    width: 360,
  },
  item: {
    width: 450,
  },
  header: {
    fontSize: 28,
  },
  title: {
    fontSize: 24,
  },
});
