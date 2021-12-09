
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export const confirmationAlertBox = () => {

    confirmAlert({
        title: 'Confirmation de suppression',
        message: 'Souhaitez-vous supprimer cette plante de votre serre virtuelle.',
        buttons: [
            {
            label: 'Oui',
            onClick: () => alert('Click Yes')
            },
            {
            label: 'Non',
            onClick: () => {}
            }
        ]
    });
}   