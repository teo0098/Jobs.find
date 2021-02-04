enum RegisterActions {
    ERROR = 'ERROR',
    LOADING = 'LOADING',
    SUCCESS = 'SUCCESS',
    UNABLE_TO_REGISTER = 'Unable to sign you up... Please attempt once again later',
    UNABLE_TO_LOGIN = 'Unable to sign you in... Please attempt once again later',
    EMAIL_EXISTS = 'EMAIL EXISTS',
    EMAIL_IN_USE = 'This email is already in use',
    UNABLE_TO_ADD_JOB = 'Unable to synchronize this job with a cloud... Please attempt once again later',
    UNABLE_TO_REMOVE_JOB = 'Unable to remove this job from a cloud... Please attempt once again later',
    JOB_EXISTS = 'This job has been already added',
    UNABLE_TO_EDIT = 'Unable to edit your data... Please attempt once again later',
    UNABLE_TO_EDIT_PASSWORD = 'Unable to edit your password... Please attempt once again later',
    UNABLE_TO_DELETE_ACCOUNT = 'Unable to delete your account... Please attempt once again later'
}

export default RegisterActions