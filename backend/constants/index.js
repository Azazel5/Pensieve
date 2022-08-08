import dev from './constants.dev.js'
import prod from './constants.prod.js'

function getConstantsAccordingToEnv(env) {
    if (env === 'dev')
        return dev
    else if (env === 'prod')
        return prod
    else
        throw new Error('Wrong environment configuration')
}

const constants = getConstantsAccordingToEnv(process.env.ENVIRONMENT)
export default constants