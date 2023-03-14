import Tooltip from 'react-native-walkthrough-tooltip';
import { Text } from 'react-native';

export const MyTooltip = ({ tooltipText, visible, placement, children }) => {
  return (
    <Tooltip
      isVisible={visible}
      contentStyle={{
        flex: 1,
        backgroundColor: '#62D7C5',
        borderRadius: 10,
      }}
      content={
        <Text
          style={{
            fontSize: 18,
          }}
        >
          {tooltipText}
        </Text>
      }
      placement={placement}
      onClose={() => ({})}
    >
      {children}
    </Tooltip>
  );
};
