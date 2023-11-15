import defineEmitterControls from './emitterControls.js';

export default (modalName) => {
  const OPEN_CHANNEL = `${modalName}Open`;
  const CLOSE_CHANNEL = `${modalName}Close`;
  const UPDATE_CHANNEL = `${modalName}Update`;

  const open = defineEmitterControls(OPEN_CHANNEL);
  const close = defineEmitterControls(CLOSE_CHANNEL);
  const update = defineEmitterControls(UPDATE_CHANNEL);

  return {
    modalName: modalName,
    open,
    close,
    update,
  }
}
