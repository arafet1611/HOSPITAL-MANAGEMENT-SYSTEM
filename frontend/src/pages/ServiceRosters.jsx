import ServerSelector from '../components/HR/serviceRoster/ServerSelector'
import ServiceRoster from '../components/HR/serviceRoster/ServiceRoster'

function ServiceRosters() {
  return (
    <div className="container py-5">
      <ServerSelector />
      <ServiceRoster />
      </div>
  )
}

export default ServiceRosters