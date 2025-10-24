import { AlignmentType } from "docx"

export const baseStyles = {
  default: {
    document: {
      run: {
        font: 'Inter',
        size: 20,
      },
      paragraph: {
        alignment: AlignmentType.JUSTIFIED,
      }
    }
  }
}

export const paragraphSpacing = {
  after: 300,
}