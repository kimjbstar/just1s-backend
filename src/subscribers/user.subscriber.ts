import {
  EventSubscriber,
  EntitySubscriberInterface,
  UpdateEvent,
  InsertEvent
} from "typeorm";
import { User } from "@src/entities/user.entity";

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  /**
   * Indicates that this subscriber only listen to User events.
   */
  listenTo() {
    return User;
  }

  /**
   * Called before post insertion.
   */
  beforeInsert(event: InsertEvent<User>) {
    const { entity }: { entity: User } = event;
    if (entity && entity.pw !== undefined) {
      entity.pw = User.getHashedPw(entity.pw);
    }
  }

  /**
   * Called before post update.
   */
  beforeUpdate(event: UpdateEvent<User>) {
    const { entity }: { entity: User } = event;

    event.updatedColumns.forEach((column) => {
      if (column.propertyName == "pw") {
        entity.pw = User.getHashedPw(entity.pw);
      }
    });
  }
}
