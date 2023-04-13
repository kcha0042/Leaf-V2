import useForceUpdate from 'use-force-update';
import StatePublisher from '../state/StatePublisher';
import Session from '../model/Session';
import { Text } from 'react-native-paper';

/**
 * THIS IS A DEMO COMPONENT
 */

const FormOutput: React.FC = () => {
    const forceUpdate = useForceUpdate()

    StatePublisher.formPublisher.subscribe(() => {
        forceUpdate();
    })

    let text: string | null = Session.instance.formEntry?.getContent();

    return (
        <Text variant="bodyLarge" style={{textAlign: 'center', padding: 20}}>
            {text ?? "Nothing Yet Submitted"}
        </Text>
    );
}

export default FormOutput;