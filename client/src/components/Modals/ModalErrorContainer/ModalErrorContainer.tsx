import { AppNotification } from "../../../interfaces";
import { ModalNotification } from "../ModalNotification/ModalNotification";

export interface ModalErrorContainerProps {
  visible: boolean;
  errors: AppNotification[];
}

export const ModalErrorContainer = ({visible, errors}: ModalErrorContainerProps) => {
  return (
    <div>
      <h3>The following errors require your attention</h3>
      {errors && errors.map ? errors.map((e, index) => <ModalNotification notification={e} />) : null}
    </div>
  )
}