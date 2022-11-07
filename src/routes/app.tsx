import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "native-base";
import { PlusCircle, SoccerBall } from "phosphor-react-native";
import { CreatePoll } from "../screens/CreatePoll";
import { FindPoll } from "../screens/FindPoll";
import { PollDetails } from "../screens/PollDetails";
import { Polls } from "../screens/Polls";

const Tab = createBottomTabNavigator();

export function AppRoutes() {
  const { colors, sizes } = useTheme();

  const iconSize = sizes[6];

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: "beside-icon",
        tabBarActiveTintColor: colors.yellow[500],
        tabBarInactiveTintColor: colors.gray[300],
        tabBarStyle: {
          height: sizes[22],
          borderTopWidth: 0,
          backgroundColor: colors.gray[800],
        },
      }}
    >
      <Tab.Screen
        name="createPoll"
        component={CreatePoll}
        options={{
          tabBarIcon: ({ color }) => (
            <PlusCircle color={color} size={iconSize} />
          ),
          tabBarLabel: "Novo bolão",
        }}
      />

      <Tab.Screen
        name="polls"
        component={Polls}
        options={{
          tabBarIcon: ({ color }) => (
            <SoccerBall color={color} size={iconSize} />
          ),
          tabBarLabel: "Meus bolões",
        }}
      />

      <Tab.Screen
        name="findPoll"
        component={FindPoll}
        options={{
          tabBarButton: () => null,
        }}
      />

      <Tab.Screen
        name="pollDetails"
        component={PollDetails}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Tab.Navigator>
  );
}
