import fetchStatistics from './StatisticsController'
import {
  fetchUsers, deleteUser, addUser, changeRole, updateUser,
} from './UsersController'
import fetchEquipments from './EquipmentController'
import fetchEquipmentsState from './VariatorEquipment'
import fetchNotifications from './NotificationController'
import fetchErrors from './ErrorsController'
import shutDownPlace from './ShutdownController'

export {
  fetchStatistics,
  fetchUsers,
  deleteUser,
  addUser,
  changeRole,
  fetchEquipmentsState,
  fetchEquipments,
  fetchNotifications,
  updateUser,
  fetchErrors,
  shutDownPlace,
}
