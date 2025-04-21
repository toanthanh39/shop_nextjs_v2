<meta charset="UTF-8" />
<style>
	@print {
		size: A4; /* Set page size */
		margin: 10cm; /* Set margins */

		#bill {
			width: 58mm; /* Set the paper width */
			font-size: 12px;
			height: 400px;
		}

		.receipt {
			width: 100%;
			position: relative;
		}
	}

	p {
		margin: 0;
	}

	.table_detail {
		border-collapse: collapse;
	}

	.table_detail tbody tr:first-child {
		border-top: 2px solid #000 !important;
	}
	.td_right {
		width: 50%;
		text-align: right;
	}

	.td_left {
		width: 50%;
		text-align: right;
	}

	.tr {
		width: 100%;
	}

	.flex_col {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
</style>
<div
	id="bill"
	class="receipt"
	style="
		margin: 0;
		font-family: Helvetica;
		font-size: 12px;
		page-break-after: always;
	">
	<div>
		<div class="flex-col" style="margin: 0 0 12px 0">
			<p><strong>Địa chỉ:</strong> {{ store.address }}</p>
			<p><strong>Điện thoại:</strong> {{ store.phone }}</p>
			<p><strong>Website:</strong> {{ store.website }}</p>
			<p><strong>Nhân viên:</strong> {{ label_seller }}</p>
			<p><strong>Ngày bán:</strong> {{ date_created }}</p>
		</div>
		<div style="clear: both"></div>
	</div>
	<div style="width: 100%; text-align: center; margin-bottom: 12px">
		<h3
			style="font-size: 14px; line-height: 12px; text-align: center; margin: 0">
			Hóa đơn: {{ code }}
		</h3>
	</div>
	<div style="width: 100%">
		<div style="margin: 0 0 12px 0; white-space: normal" class="flex-col">
			<p><strong>KH:</strong> {{ shipping_fullname }}</p>

			{% if shipping_full_address %}
			<p><strong>Địa chỉ:</strong> {{ shipping_full_address }}</p>
			{% endif %}

			<p><strong>Điện thoại:</strong> {{ shipping_phone }}</p>

			{% if billing_email %}
			<p><strong>Email:</strong> {{ billing_email }}</p>
			{% endif %}
		</div>

		<table
			style="
				margin: 0 0 12px 0;
				font-size: 12px;
				width: 100%;
				border-top: 2px solid #000;
				border-bottom: 1px dashed #333;
			"
			class="table_detail">
			<thead>
				<tr>
					<th style="width: 60%; text-align: left; padding: 5px 0px">
						Đgiá/Ggiảm
					</th>
					<th style="width: 10%; text-align: center; padding: 5px 0px">SL</th>
					<th style="width: 30%; text-align: right; padding: 5px">T.Tiền</th>
				</tr>
			</thead>
			<tbody>
				{% for product in details.data %}
				<tr valign="top" style="border-top: 1px solid #d9d9d9">
					<td colspan="3" style="padding: 5px 0px 0">
						<p style="margin-bottom: 5px">
							{{ product.item_name }}
							{% if product.product_json.option_name %} -
							<span style="margin: 0">{{
								product.product_json.option_name
							}}</span>
							{% endif %} - <span>{{ product.product_json.sku }}</span>
						</p>
					</td>
				</tr>
				<tr valign="top">
					<td style="padding: 5px 0px; text-align: left">
						{{ product.item_unit_price | currency }}
					</td>
					<td style="padding: 5px 0px; text-align: center">
						{{ product.item_quantity }}
					</td>
					<td style="padding: 5px 0px; text-align: right">
						{{ product.price_sell | currency }}
					</td>
				</tr>
				{% endfor %}
			</tbody>
		</table>
		<table
			style="
				font-size: 12px;
				width: 100%;
				margin: 0 0 12px 0;
				text-align: right;
			">
			<tbody>
				<tr class="tr">
					<td class="td_left">Phí vận chuyển:</td>
					<td class="td_right">
						{{ price_shipping | currency }}
					</td>
				</tr>
				{% if price_tax %}
				<tr>
					<td class="td_left">Phí VAT:</td>

					<td class="td_right">
						{{ price_tax_value | currency }}
					</td>
				</tr>
				{% endif %} {% for promotion in promotions %}
				<tr>
					<td class="td_left">Khuyến mãi:</td>
					<td class="td_right">
						{{ promotion.code }}
					</td>
				</tr>
				{% endfor %} {% if price_discount %}
				<tr>
					<td class="td_left">Giảm giá:</td>
					<td class="td_right">
						{{ price_discount | currency }}
					</td>
				</tr>
				{% endif %}
				<tr>
					<td class="td_left">
						<strong>Thành tiền:</strong>
					</td>
					<td class="td_right">
						<strong> {{ price_final | currency }}</strong>
					</td>
				</tr>
				<tr>
					<td class="td_left">Tiền phải thanh toán:</td>
					<td class="td_right">
						{{ debt | currency }}
					</td>
				</tr>
				<tr>
					<td class="td_left">Tiền đã thanh toán:</td>
					<td class="td_right">
						{{ deposit | currency }}
					</td>
				</tr>
			</tbody>
		</table>
		{% if note %}
		<table style="font-size: 12px; width: 100%; margin: 0 0 12px 0">
			<tr>
				<td>Ghi chú: {{ note }}</td>
			</tr>
		</table>
		{% endif %}
	</div>
	<div style="clear: both"></div>
	<p>
		Nếu bạn có thắc mắc, vui lòng liên hệ chúng tôi qua email
		{{ store.email }} hoặc {{ store.phone }}
	</p>
</div>
