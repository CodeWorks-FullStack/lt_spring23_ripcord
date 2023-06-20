import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get("/friends", this.getFriends)
      .put("", this.edit)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async edit (req, res, next) {
  try {
    let user = req.userInfo
    let accountBody = req.body
    const account = await accountService.updateAccount(user, accountBody)
    return res.send(account)
  } catch (error) {
    next(error)
  }
  }


  // SECTION FRIENDS

  async getFriends (req, res, next) {
  try {
    let creatorId = req.userInfo.id
    let friends = await accountService.getFriends(creatorId)
    return res.send(friends)
  } catch (error) {
    next(error)
  }
  }

}
