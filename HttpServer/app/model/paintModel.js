'use strict'

module.exports = app => {
  const {
    STRING,
    INTEGER,
  } = app.Sequelize

  /**
   * @desc paint 图片表
   * paintId: id
   */
  const PaintModel = app.model.define('paint', {
    paintId: {
      type: INTEGER(20),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: STRING(100),
      allowNull: false,
		},
		paintUrl: {
      type: STRING(500),
      allowNull: false,
		},
		personal: {
			type: INTEGER(20),
      allowNull: false,
		}
  }, {
    created_at: 'created_at',
    updated_at: 'updated_at',
    freezeTableName: true,
	})
	
	PaintModel.associate = function() {
		PaintModel.hasMany(app.model.LikeModel, {
      foreignKey: 'paint_id'
		})
    PaintModel.belongsTo(app.model.UserModel, {
      foreignKey: 'user_id'
		})
		PaintModel.hasMany(app.model.CommentModel, {
      foreignKey: 'paint_id'
    })

	}

  return PaintModel
}