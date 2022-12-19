import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { makeNotification } from '@test/factories/notification-factory';
import { GetRecipientNotification } from './get-recipient-notifications';

describe('Get recipients notification', () => {
  it('should be able to get recipient notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const getRecipientNotification = new GetRecipientNotification(notificationsRepository);

    await notificationsRepository.create(makeNotification({ recipientId: 'recipient-1' }))

    await notificationsRepository.create(makeNotification({ recipientId: 'recipient-1' }))

    await notificationsRepository.create(makeNotification({ recipientId: 'recipient-2' }))
    
    const { notifications } = await getRecipientNotification.execute({
      recipientId: 'recipient-1'
    })

    expect(notifications).toHaveLength(2)
    expect(notifications).toEqual(expect.arrayContaining([
      expect.objectContaining({ recipientId: 'recipient-1' }),
      expect.objectContaining({ recipientId: 'recipient-1' }),
    ]))
  })
})