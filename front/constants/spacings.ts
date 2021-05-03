import { scaleNormalize } from '../utils';

const Spacings = {
    Paddings: {
        smallest: scaleNormalize(4),
        smaller: scaleNormalize(8),
        default: scaleNormalize(16),
        larger: scaleNormalize(24),
        largest: scaleNormalize(36),
    },

    Margins: {
        smallest: scaleNormalize(4),
        smaller: scaleNormalize(8),
        default: scaleNormalize(16),
        larger: scaleNormalize(24),
        largest: scaleNormalize(36),
    },
};

export default Spacings;
