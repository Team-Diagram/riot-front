import fetchStatistics from './StatisticsController'
import {
  fetchUsers, deleteUser, addUser, changeRole,
} from './UsersController'
import fetchEquipments from './EquipmentController'
import fetchEquipmentsState from './VariatorEquipment'
import fetchNotifications from './NotificationController'

export {
  fetchStatistics,
  fetchUsers,
  deleteUser,
  addUser,
  changeRole,
  fetchEquipmentsState,
  fetchEquipments,
  fetchNotifications,
}
