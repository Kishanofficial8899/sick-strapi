import ResetPassword from '../components/resetPasswordRequest'

export default function ResetPage({ query }) {
    return <div>
        <ResetPassword code={query.code} />
    </div>
}