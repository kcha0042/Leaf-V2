import useForceUpdate from 'use-force-update';
import Session from '../model/Session';
import StateManager from '../state/publishers/StateManager';
import LeafText from './core/views/LeafText/LeafText';
import LeafTypography from './core/styles/LeafTypography';

/**
 * THIS IS A DEMO COMPONENT
 */
const FormOutput: React.FC = () => {
    const forceUpdate = useForceUpdate()

    StateManager.formSubmitted.subscribe(() => {
        // Note, instead of force updating, a standard useState hook could be used instead
        forceUpdate();
    })

    let text: string | null = Session.instance.formEntry?.getContent();

    return (
        <LeafText 
            typography={LeafTypography.body}
            style={{textAlign: 'center', padding: 20}}
        >
            {text ?? "Nothing Yet Submitted"}
        </LeafText>
    );
}

export default FormOutput;