import React from 'react';
import { StyleSheet, View } from 'react-native'
import { Layout } from './Layout'
import { Image, ListItem } from 'react-native-elements'
import { EScreens } from './Navigation/Navigation'

interface ICarpoolTripData {
    date: string;
    driver: string;
    description: string;
    driverProfileUrl?: string;
}

interface ICarpoolTrips {
    title: string;
    topic: ECarpoolTopic;
    carpools: ICarpoolTripData[];
}

enum ECarpoolTopic {
    PREVIOUS = 'previous',
    NEXT = 'next',
    FUTURE = 'future',
}

const carpoolList: ICarpoolTrips[] = [
    {
        topic: ECarpoolTopic.NEXT,
        title: "Next trip",
        carpools: [
            {
                description: "Bar crawl",
                driver: "Georgio",
                date: "22/12/2021",
                driverProfileUrl: "https://openpsychometrics.org/tests/characters/test-resources/pics/S/2.jpg"
            },
        ]
    },
    {
        topic: ECarpoolTopic.FUTURE,
        title: "Future trips",
        carpools: [
            {
                description: "Gin tour",
                driver: "Nicola",
                date: "26/12/2021",
                driverProfileUrl: "https://images.immediate.co.uk/production/volatile/sites/3/2016/03/Simpsons_g2013_R1_marge-04bf0d1.jpg?webp=true&quality=90&crop=3px%2C170px%2C1884px%2C1255px&resize=620%2C413"
            },
            {
                description: "Rogaine",
                driver: "Paul",
                date: "27/12/2021",
                driverProfileUrl: "https://images.immediate.co.uk/production/volatile/sites/3/2018/08/Simpsons_SO28_Gallery_11-fb0b632.jpg?webp=true&quality=90&resize=620%2C413"
            },
        ],
    },
    {
        topic: ECarpoolTopic.PREVIOUS,
        title: "Previous trips",
        carpools: [
            {
                description: "Hike",
                driver: "Bray",
                date: "10/12/2021",
                driverProfileUrl: "https://static.wikia.nocookie.net/p__/images/e/ec/Lisa_Simpson.png/revision/latest?cb=20160403144746&path-prefix=protagonist"
            },
            {
                description: "Bar crawl",
                driver: "Drinker",
                date: "02/12/2021",
                driverProfileUrl: "https://tv-fanatic-res.cloudinary.com/iu/s--SOvcg_Y0--/t_full/cs_srgb,f_auto,fl_strip_profile.lossy,q_auto:420/v1371141957/barney-gumble-pic.png"
            },
        ],
    },
];

interface ICarpoolItem extends ICarpoolTripData, ICarpoolList {}

const CarpoolItem: React.FC<ICarpoolItem> = ({ description, driver, date, driverProfileUrl, navigation }) => (
    <ListItem style={styles.item} hasTVPreferredFocus={undefined} tvParallaxProperties={undefined} bottomDivider={true}
              onPress={()=>navigation.navigate(EScreens.MAP)}
    >
        <Image style={styles.driverProfileUrl} source={{uri: driverProfileUrl}} />
        <ListItem.Content>
            <ListItem.Title>{description}</ListItem.Title>
            <ListItem.Subtitle style={styles.accordionDriverText}>{driver}</ListItem.Subtitle>
            <ListItem.Subtitle>{date}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron style={styles.accordionChevron} tvParallaxProperties={false} />
    </ListItem>
);

interface ICarpoolList {
    navigation: any;
}

export const CarpoolList: React.FC<ICarpoolList> = ({navigation}) => {
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
        setExpanded({...expanded, [topic]: !expanded?.[topic]})
    }

    return (
        <Layout>
            {carpoolList.map((carpoolTopic, d) => (
                <ListItem.Accordion
                    key={d}
                    hasTVPreferredFocus={false}
                    tvParallaxProperties={false}
                    content={
                        <View style={styles.accordion}>
                            <ListItem.Title style={styles.accordionTitle}>{carpoolTopic.title}</ListItem.Title>
                        </View>
                    }
                    isExpanded={expanded[carpoolTopic?.topic]}
                    onPress={() => controlAccordion(carpoolTopic.topic)}
                >
                    {carpoolTopic?.carpools?.map((l, i) => (
                        <CarpoolItem key={i} navigation={navigation} {...l} />
                    ))}
                </ListItem.Accordion>
            ))}
        </Layout>
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
        fontWeight: "bold",
    },
    accordionDriverText: {
        fontWeight: "normal",
        color: '#4f4333'
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
