import { Request, Response, NextFunction } from 'express';

/**
 * Checks for valid param from URL. Hyphens and lowercase letters are allowed.
 * @param req Request object
 * @param res Response object
 * @param next Next function
 */
const validUrlType = (req: Request, res: Response, next: NextFunction): void => {
  const { section } = req.params;
  const regexp = /^[a-z0-9-]+$/;
  if (regexp.test(section) === false) {
    res.status(400).json({
      message: 'URL should contain only lowercase letters and hyphens characters',
    });
  } else {
    next(); // Call next to proceed to the next middleware or route handler
  }
};

export default validUrlType;
